// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const PrivateRoute = ({ children }) => {
  const { isAuthenticated ,loading } = useAuth();

  if(loading){
    return <>Loading...</>
  }

//   return children
  return isAuthenticated === true ? children : window.location.href = 'http://27.0.175.106:3000/auth/login';
};

export default PrivateRoute;
