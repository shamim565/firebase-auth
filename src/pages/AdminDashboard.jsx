import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import "./Pages.css";

const AdminDashboard = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return null;
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-card dashboard-card">
          <h1 className="dashboard-title">Welcome, Admin {user.name}!</h1>
          <p className="dashboard-text">
            You have successfully logged in to SkillSync as an administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
