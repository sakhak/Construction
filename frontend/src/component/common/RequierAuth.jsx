import { useContext } from "react";
import { AuthContext } from "../frontend/context/AuthContext";
import { Navigate } from "react-router-dom";

const RequierAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default RequierAuth;
