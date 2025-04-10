// src/components/RoleRedirect.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRedirect = () => {
  const { user } = useSelector((state) => state.auth);

  switch (user?.role) {
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
