import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

export const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  const nextLocation = state || 'dashboard';

  if (user.uid === '') {
    return <Redirect to={`/signin?state=${nextLocation}`} />;
  }

  return <>{children}</>;
};
