import { useState } from 'react';
import { AnonymousColor } from './Anonymous';

export interface UserModel {
  displayName: string;
  avatarUrl: string;
  uid: string;
  eventIdsParticipated: string[];
  isAnonymous?: boolean;
  twitterIntegration?: TwitterIntegration;
}

export class User implements UserModel {
  displayName = '';
  avatarUrl = '';
  uid: string;
  eventIdsParticipated: string[];
  isAnonymous?: boolean | undefined;
  twitterIntegration?: TwitterIntegration | undefined;

  constructor(user: firebase.User) {
    const { isAnonymous, uid, providerData } = user;
    if (
      providerData[0] &&
      providerData[0].displayName &&
      providerData[0].photoURL
    ) {
      this.displayName = providerData[0].displayName;
      this.avatarUrl = providerData[0].photoURL;
    }
    this.uid = uid;
    this.isAnonymous = isAnonymous;
    this.eventIdsParticipated = [];
  }
}

export const initialUserData: UserModel = {
  displayName: '',
  avatarUrl: '',
  uid: '',
  eventIdsParticipated: [],
};

export interface TwitterIntegration {
  screenName: string;
  accessToken: string;
  accessTokenSecret: string;
}

export const getAvatarUrl = (user: UserModel) => {
  if (user.isAnonymous || !user.avatarUrl) {
    return user.anonymousColor
      ? user.anonymousColor.anonymousImage
      : ANONYMOUS_COLOR_IMAGE[0];
  }

  return user.avatarUrl;
};
