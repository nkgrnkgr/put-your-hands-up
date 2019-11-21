import { loadAnonymousUserData, AnonymousColor } from './AnonymousUser';

export interface UserModel {
  displayName: string;
  avatarUrl: string;
  uid: string;
  eventIdsParticipated: string[];
  isAnonymous: boolean;
  anonymousColor?: AnonymousColor;
  twitterIntegration?: TwitterIntegration;
}

export interface TwitterIntegration {
  screenName: string;
  accessToken: string;
  accessTokenSecret: string;
}

export const initialUserData: UserModel = {
  displayName: '',
  avatarUrl: '',
  uid: '',
  isAnonymous: false,
  eventIdsParticipated: [],
};

export const fetchOrCreateUser = (user: firebase.User): UserModel => {
  if (user.isAnonymous) {
    return loadAnonymousUserData(user);
  }
  const data = user.providerData[0];
  if (data) {
    return {
      ...initialUserData,
      displayName: user.displayName || '',
      avatarUrl: data.photoURL || '',
      uid: user.uid,
    };
  }

  return {
    ...initialUserData,
  };
};
