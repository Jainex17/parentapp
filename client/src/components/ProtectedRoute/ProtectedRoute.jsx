import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthenticated, redirect, children, path="" }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} />;
    }
    return (
        children ? children : <Outlet />
    );
};
