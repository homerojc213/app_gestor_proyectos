import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'

const authToken = localStorage.getItem(AUTH_TOKEN) || "";
const rol = JSON.parse(window.atob(authToken.split('.')[1])).rol || "";


const PrivateRoute = ({ children }) => {
  return (
    <div>
      {authToken ? children : <Navigate to="/" />}
    </div>
  );
};

const PrivateRouteAdmin = ({ children }) => {
  return (
    <div>
      {rol === "Administrador" ? children : <Navigate to="/" />}
    </div>
  );
};
const PrivateRouteEstudiante = ({ children }) => {
  return (
    <div>
      {rol === "Estudiante" ? children : <Navigate to="/" />}
    </div>
  );
};

const PrivateRouteLider = ({ children }) => {
  return (
    <div>
      {rol === "Lider" ? children : <Navigate to="/" />}
    </div>
  );
};

export { PrivateRoute, PrivateRouteAdmin, PrivateRouteEstudiante, PrivateRouteLider };


