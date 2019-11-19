import React, { useContext } from 'react';
import { UserSetting as Component } from '../components/UserSetting';
import { AnonymousColor, UserModel } from '../../../models/User';
import { save } from '../../../utils/localStorageAccessor';
import { UserContext } from '../../../contexts/UserContext';
import { useLocation } from 'react-router';

export const UserSetting = () => {
  const { userValue, setUserValue } = useContext(UserContext);
  const location = useLocation();

  const setAnonymousUserInfo = (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => {
    return new Promise<void>(resolve => {
      const { user } = userValue;
      if (user) {
        const updatedUser: UserModel = {
          ...user,
          displayName,
          avatarUrl: anonymousColor.anonymousImage,
          anonymousColor,
        };
        save('user', updatedUser);
        setUserValue({
          ...userValue,
          user: updatedUser,
        });
        resolve();
      }
    });
  };

  if (!userValue.user) {
    return <></>;
  }

  return (
    <Component
      user={userValue.user}
      setAnonymousUserInfo={setAnonymousUserInfo}
    />
  );
};
