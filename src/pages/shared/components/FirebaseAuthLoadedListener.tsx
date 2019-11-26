import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import Loading from './Loading';

export const FirebaseAuthLoadedListener: React.FC = ({ children }) => {
  const { applicationValues } = useContext(ApplicationContext);

  if (!applicationValues.isFirebaseAuthInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};
