import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useUser } from '../../../hooks/users';
import { updateTwitterIntegration } from '../../../firebase/api/users';

export const UserUpdater: React.FC = ({ children }) => {
  const { userValue, setUserValue } = useContext(UserContext);
  const { user, loading, error } = useUser(
    userValue.user.uid,
    userValue.user.isAnonymous,
  );

  // LocalUserのTwitterIntegrationの設定が完了したら
  useEffect(() => {
    const { uid, twitterIntegration } = userValue.user;

    if (uid) {
      updateTwitterIntegration(uid, twitterIntegration || null);
    }
  }, [userValue.user.twitterIntegration]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return <>{children}</>;
};
