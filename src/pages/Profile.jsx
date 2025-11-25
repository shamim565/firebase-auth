import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import Navbar from "../components/Navbar";
import "./Pages.css";

const Profile = () => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return null;
  }

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="page-card">
          <h1 className="profile-title">Profile</h1>
          <div className="profile-fields">
            <div className="profile-field">
              <label className="profile-label">Full Name</label>
              <p className="profile-value">{user.name}</p>
            </div>
            <div className="profile-field">
              <label className="profile-label">Email</label>
              <p className="profile-value">{user.email}</p>
            </div>
            <div className="profile-field">
              <label className="profile-label">Role</label>
              <p className="profile-value capitalize">
                {user.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
