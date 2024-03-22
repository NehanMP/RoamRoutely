import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isSignedIn = useSelector((state) => state.user.isSignedIn);

    if (!isSignedIn) {
      return <Navigate to="/SignIn" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
