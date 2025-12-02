import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (user?.role !== "admin") return <Navigate to="/unauthorized" replace />;

    return children;
};

export default AdminRoute;
