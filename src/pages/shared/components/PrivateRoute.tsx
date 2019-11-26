import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

export const PrivateRoute: React.FC = ({ children }) => {
  const { userValue } = useContext(UserContext);

  if (userValue.user.uid === '') {
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
};
