import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useUser } from '../../../firebase/api/users';

export const UserUpdater: React.FC = ({ children }) => {
  const { userValue, setUserValue } = useContext(UserContext);
  const { user, loading, error } = useUser(userValue.user.uid);

  useEffect(() => {
    if (user) {
      setUserValue({
        ...userValue,
        user,
      });
    }
  }, [userValue.user, user]);

  if (loading) {
    return <></>;
  }

  if (error || !user) {
    return <></>;
  }

  return <>{children}</>;
};
