import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

export const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const { state } = useLocation();

  if (user.uid === '') {
    return <Redirect to={`/signin?state=${state}`} />;
  }

  return <>{children}</>;
};
