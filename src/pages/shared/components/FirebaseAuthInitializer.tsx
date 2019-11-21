import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { UserContext } from '../../../contexts/UserContext';
import { firebase } from '../../../firebase/index';
import { loadOrCreateUser } from '../../../models/User';

export const FirebaseAuthInitializer: React.FC = ({ children }) => {
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );
  const { userValue, setUserValue } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setApplicationValues({
          ...applicationValues,
          isSignIned: true,
          isFirebaseAuthInitialized: true,
        });
        setUserValue({
          ...userValue,
          user: loadOrCreateUser(user),
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
