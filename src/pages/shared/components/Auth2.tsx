import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { Redirect } from 'react-router';
import Loading from './Loading';
import { UserContext } from '../../../contexts/UserContext';

export const Auth2: React.FC = ({ children }) => {
  const { userValue } = useContext(UserContext);

  if (userValue.user.uid === '') {
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
};
