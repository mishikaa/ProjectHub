// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token'); // Example check for authentication

    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/user/signin" />;
};

export default PrivateRoute;
