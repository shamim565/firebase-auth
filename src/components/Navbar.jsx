import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { selectCurrentUser, selectUserRole } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApi";

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectUserRole);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/login");
    }
    catch(error){
      dispatch(logout());
      navigate("/login");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="navbar-logo">
              <Link to="/">SkillSync</Link>
            </div>
            <div className="navbar-links">
              <Link to="/dashboard" className={`navbar-link`}>
                Dashboard
              </Link>
              <Link to="/profile" className={`navbar-link`}>
                Profile
              </Link>
            </div>
          </div>
          <div className="navbar-right">
            <div className="navbar-user-section">
              <div className="navbar-user-info">
                <div className="navbar-avatar">
                  <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
                </div>
                <div className="navbar-user-details">
                  <div className="navbar-user-name">{user.name}</div>
                  <div className="navbar-user-role">{role || "Member"}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
