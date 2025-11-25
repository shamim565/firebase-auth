import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserRole } from "../features/auth/authSlice";

const AdminRoute = ({children}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const role = useSelector(selectUserRole);

    if (!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    if(role !== "admin"){
        return <Navigate to="/" replace/>
    }

  return children;
}

export default AdminRoute