import { Navigate } from "react-router-dom";

const ProtectedHomeRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/user-login" replace />;
  }
  return children;
};

export default ProtectedHomeRoute;