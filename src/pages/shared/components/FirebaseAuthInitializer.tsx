import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { UserContext } from '../../../contexts/UserContext';
import { firebase } from '../../../firebase/index';
import { loadOrCreateUser } from '../../../models/User';

export const FirebaseAuthInitializer: React.FC = ({ children }) => {
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(loadOrCreateUser(user));
        setApplicationValues({
          ...applicationValues,
          isFirebaseAuthInitialized: true,
        });
      } else {
        setApplicationValues({
          ...applicationValues,
          isFirebaseAuthInitialized: true,
        });
      }
    });
  }, []);

  return <>{children}</>;
};
