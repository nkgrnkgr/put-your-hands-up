import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import Loading from './Loading';
import { useUser } from '../../../hooks/users';
import { UserContext } from '../../../contexts/UserContext';
import { getUser } from '../../../firebase/api/users';

export const Auth: React.FC = ({ children }) => {
  const { applicationValues } = useContext(ApplicationContext);
  const { userValue, setUserValue } = useContext(UserContext);
  // const {user, loading, error} = useUser(
  //   userValue.user.uid,
  //   userValue.user.isAnonymous
  // );

  // useEffect(() => {
  //   if (user) {
  //     setUserValue({
  //       ...userValue,
  //       user: user,
  //     });
  //   }
  // }, [user]);

  // 必ず必要なFirestoreの
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
