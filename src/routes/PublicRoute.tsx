import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/auth";

type PublicRouteProps = {
  children: React.JSX.Element;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = getToken();
  if (!token) return children;
  const role = getUserRole();
  if (role === "ADMIN") {
    return <Navigate to="/dashboard" />;
  }
  if (role === "STUDENT") {
    return <Navigate to="/student" />;
  }
}
