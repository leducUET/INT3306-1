import { Navigate } from "react-router-dom";
import { userRoles } from "../helpers/roles";
const PrivateRoute = ({ children, roles = Object.values(userRoles) }) => {
  const currentUser = JSON.parse(localStorage.getItem("userLogin"));
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (roles && roles.indexOf(currentUser.user.role) === -1) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
