import { Link } from "react-router-dom";
import "./Pages.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-number">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-text">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/dashboard" className="notfound-link">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
