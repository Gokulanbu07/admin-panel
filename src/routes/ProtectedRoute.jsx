import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show nothing while auth is verifying
    if (isLoading) return null;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
