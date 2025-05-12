// src/components/AuthLayout.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthProvider, { AuthContext } from "@/provider/AuthProvider";
const AuthLayout = () => {
  const { profile } = useContext(AuthContext);

  if (profile) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default AuthLayout;
