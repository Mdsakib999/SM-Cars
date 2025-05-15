// src/components/RoleRedirect.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "@/provider/AuthProvider";
const RoleRedirect = () => {
  const { profile, loading } = useContext(AuthContext);
  if (loading) {
    return <>Loading...</>;
  }

  switch (profile.role) {
    case "admin":
      return <Navigate to="/dashboard/manage-users" replace />;
    case "seller":
      return <Navigate to="/dashboard/seller-overview" replace />;
    case "buyer":
      return <Navigate to="/dashboard/buyer-overview" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleRedirect;
