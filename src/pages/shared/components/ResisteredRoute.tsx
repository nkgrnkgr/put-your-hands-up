import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

export const ResisterdRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user.isAnonymous) {
    return <Redirect to="/forbidden" />;
  }

  return <>{children}</>;
};
