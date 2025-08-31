import { type ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Define the prop type for ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to login.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children wrapped in a fragment.
  return <>{children}</>;
};

export default ProtectedRoute;
