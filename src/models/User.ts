import black from '../images/anonymous-black.png';
import blue from '../images/anonymous-blue.png';
import green from '../images/anonymous-green.png';
import orange from '../images/anonymous-orange.png';
import pink from '../images/anonymous-pink.png';
import purple from '../images/anonymous-purple.png';
import red from '../images/anonymous-red.png';
import { useState } from 'react';

export interface UserModel {
  displayName: string;
  avatarUrl: string;
  uid: string;
  eventIdsParticipated: string[];
  isAnonymous?: boolean;
  anonymousColor?: AnonymousColor;
  twitterIntegration?: TwitterIntegration;
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

export interface AnonymousColor {
  index: number;
  name: string;
  hex: string;
  anonymousImage: string;
}

export const ANONYMOUS_COLOR_HEX = [
  '#000000',
  '#3f92e3',
  '#548e6a',
  '#f0b43a',
  '#f6cce5',
  '#51447c',
  '#e84259',
];

export const ANONYMOUS_COLOR_NAME = [
  'black',
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
];

export const ANONYMOUS_COLOR_IMAGE = [
  black,
  blue,
  green,
  orange,
  pink,
  purple,
  red,
];

const createColors = (): AnonymousColor[] =>
  ANONYMOUS_COLOR_NAME.map((name, index) => ({
    index,
    name,
    hex: ANONYMOUS_COLOR_HEX[index],
    anonymousImage: ANONYMOUS_COLOR_IMAGE[index],
  }));

export const ANONYMOUS_COLORS = createColors();

export const getAvatarUrl = (user: UserModel) => {
  if (user.isAnonymous || !user.avatarUrl) {
    return user.anonymousColor
      ? user.anonymousColor.anonymousImage
      : ANONYMOUS_COLOR_IMAGE[0];
  }

  return user.avatarUrl;
};

export const useUserColor = (
  anonymousColor: AnonymousColor = ANONYMOUS_COLORS[0],
): [AnonymousColor, (hex: string) => void] => {
  const [color, setColor] = useState(anonymousColor);

  const selectColorWithHex = (hex: string) => {
    const index = ANONYMOUS_COLOR_HEX.indexOf(hex);
    if (index > -1) {
      setColor(ANONYMOUS_COLORS[index]);
    }
  };

  return [color, selectColorWithHex];
};