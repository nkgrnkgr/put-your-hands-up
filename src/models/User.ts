import {
  AnonymousColor,
  loadAnonymousUserData,
  updateUserData,
} from './AnonymousUser';
import { updateEventIdsParticipated } from '../firebase/api/users';
import { uniq } from '../utils/utils';

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

export const loadOrCreateUser = (user: firebase.User): UserModel => {
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

export const updateEventId = (user: UserModel, eventId: string) => {
  if (user.isAnonymous) {
    return updateUserData({
      ...user,
      eventIdsParticipated: uniq(user.eventIdsParticipated, eventId),
    });
  }

  updateEventIdsParticipated(user, eventId);
};
