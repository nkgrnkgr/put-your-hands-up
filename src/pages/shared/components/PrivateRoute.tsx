import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

export const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user.uid === '') {
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
};
