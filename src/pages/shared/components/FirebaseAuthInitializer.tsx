import React, { useEffect, useContext } from 'react';
import { firebase } from '../../../firebase/index';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import {
  UserModel,
  initialUserData,
  ANONYMOUS_COLOR_IMAGE,
} from '../../../models/User';
import { find } from '../../../utils/localStorageAccessor';
import { UserContext } from '../../../contexts/UserContext';

const createUserData = (user: firebase.User): UserModel => {
  const { isAnonymous, uid, providerData } = user;

  if (isAnonymous) {
    const localUser = find<UserModel>('user');
    if (localUser === null) {
      return {
        displayName: '匿名ユーザー',
        avatarUrl: ANONYMOUS_COLOR_IMAGE[0],
        uid,
        isAnonymous,
        eventIdsParticipated: [],
      };
    }

    return {
      ...localUser,
    };
  } else {
    const data = providerData[0];
    if (data) {
      return {
        displayName: data.displayName || '',
        avatarUrl: data.photoURL || '',
        uid,
        isAnonymous,
        eventIdsParticipated: [],
      };
    }
  }

  return initialUserData;
};

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
          user: createUserData(user),
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
