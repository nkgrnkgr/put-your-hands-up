import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { Redirect } from 'react-router';
import Loading from './Loading';

export const Auth: React.FC = ({ children }) => {
  const { applicationValues } = useContext(ApplicationContext);

  const { isFirebaseAuthInitialized, isSignIned } = applicationValues;

  if (!isFirebaseAuthInitialized) {
    return <Loading />;
  }

  if (!isSignIned) {
    return <Redirect to="/signin" />;
  }

  return <>{children}</>;
};
