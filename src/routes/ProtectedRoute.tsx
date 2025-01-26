import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Props for ProtectedRoute
interface ProtectedRouteProps {
  allowedRoles: string[]; 
  children: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const location = useLocation(); // Get the current location
  const user = useSelector((state: any) => state.user.user); 

  const userRoles = user?.role || []; 

  const hasAccess = Array.isArray(userRoles) && userRoles.some((role: string) => allowedRoles.includes(role));

  if (hasAccess) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
