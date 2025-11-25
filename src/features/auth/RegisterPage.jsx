import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredntials, setError } from "./authSlice";
import "./Auth.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: "member",
      }).unwrap();

      dispatch(setCredntials(response));
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      setLocalError(error.error || "Registration Failed. Please try again");
      dispatch(setError(error.error || "Registration Failed"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">
            Or{" "}
            <Link to="/login" className="auth-link">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <div className="auth-error-text">{error}</div>
            </div>
          )}
          <div className="auth-input-group auth-input-group-spaced">
            <div>
              <label htmlFor="name" className="auth-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="auth-input auth-input-rounded"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
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
                className="auth-input auth-input-rounded"
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
                autoComplete="new-password"
                required
                className="auth-input auth-input-rounded"
                placeholder="Password (min. 6 characters)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="auth-input auth-input-rounded"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
