import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants'

const authToken = localStorage.getItem(AUTH_TOKEN) || "";
const rol = JSON.parse(window.atob(authToken.split('.')[1])).rol || "";


const PrivateRoute = ({ children }) => {
  return authToken ? children : <Navigate to="/" />
};

const PrivateRouteAdmin = ({ children }) => {
  return rol === "Administrador" ? children : <Navigate to="/" />

};
const PrivateRouteEstudiante = ({ children }) => {
 return rol === "Estudiante" ? children : <Navigate to="/" />

};

const PrivateRouteLider = ({ children }) => {
  return rol === "Lider" ? children : <Navigate to="/" />

};

export { PrivateRoute, PrivateRouteAdmin, PrivateRouteEstudiante, PrivateRouteLider };


