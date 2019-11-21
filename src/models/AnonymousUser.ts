import black from '../images/anonymous-black.png';
import blue from '../images/anonymous-blue.png';
import green from '../images/anonymous-green.png';
import orange from '../images/anonymous-orange.png';
import pink from '../images/anonymous-pink.png';
import purple from '../images/anonymous-purple.png';
import red from '../images/anonymous-red.png';
import { useState } from 'react';
import { UserModel } from './User';
import { find } from '../utils/localStorageAccessor';

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

export type AnonymousUserModel = UserModel;

export const loadAnonymousUserLocalData = () => find<UserModel>('user') || null;

export const loadAnonymousUserData = (
  user: firebase.User,
): AnonymousUserModel => {
  const localUser = loadAnonymousUserLocalData();
  if (localUser) {
    return localUser;
  }

  const { uid, isAnonymous } = user;

  return {
    displayName: '匿名ユーザー',
    avatarUrl: ANONYMOUS_COLOR_IMAGE[0],
    uid,
    isAnonymous,
    eventIdsParticipated: [],
  };
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
