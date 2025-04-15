import React from 'react';
import useAuthStatus from '../hooks/useAuthStatus';
import Loader from './Loader';
import { Outlet, Navigate } from 'react-router-dom';

const Privatecomponent = () => {
  const { isLogin, checkStatus } = useAuthStatus();

  if (checkStatus) {
    return <Loader />; 
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default Privatecomponent;