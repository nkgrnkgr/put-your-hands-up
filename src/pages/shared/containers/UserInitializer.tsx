import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import Loading from '../components/Loading';

export const UserInitializer: React.FC = ({ children }) => {
  const { applicationValues } = useContext(ApplicationContext);
  const { isFirebaseAuthInitialized } = applicationValues;

  if (!isFirebaseAuthInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};
