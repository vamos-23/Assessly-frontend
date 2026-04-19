import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/auth";

export default function RoleProtectedRoute({
  children,
  role,
}: {
  children: React.JSX.Element;
  role: "ADMIN" | "STUDENT";
}) {
  const token = getToken();
  const userRole = getUserRole();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
