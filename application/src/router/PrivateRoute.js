import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'

const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem(AUTH_TOKEN);
    return auth ? children : <Navigate to="/Login" />;
  }

export default PrivateRoute;


