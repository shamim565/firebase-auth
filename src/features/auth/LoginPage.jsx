import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApi";
import { setCredntials, setError } from "./authSlice";
import "./Auth.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setLocalError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const response = await login(formData).unwrap();
      dispatch(setCredntials(response));
      navigate(response.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {}
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Sign in to SkillSync</h2>
          <p className="auth-subtitle">
            Or{" "}
            <Link to="/register" className="auth-link">
              create a new account
            </Link>
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <div className="auth-error-text">{error}</div>
            </div>
          )}
          <div className="auth-input-group auth-input-group-stacked">
            <div>
              <label htmlFor="email" className="auth-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="auth-input auth-input-top"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="auth-input auth-input-bottom"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit-btn"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
