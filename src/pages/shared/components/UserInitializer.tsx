import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import Loading from './Loading';
import { useUser } from '../../../hooks/users';
import { UserContext } from '../../../contexts/UserContext';
import { getUser } from '../../../firebase/api/users';

export const UserInitializer: React.FC = ({ children }) => {
  const { applicationValues } = useContext(ApplicationContext);
  const { userValue, setUserValue } = useContext(UserContext);

  useEffect(() => {
    getUser(userValue.user.uid).then(response => {
      if (response) {
        setUserValue({
          ...userValue,
          user: response,
        });
      }
    });
  }, []);

  if (!applicationValues.isFirebaseAuthInitialized) {
    return <Loading />;
  }

  return <>{children}</>;
};
