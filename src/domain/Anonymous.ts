import { FirebaseUser } from './FirebaseUser';
import { find, save, remove } from 'lib/localStorageAcsser';
import { createSetFrom } from 'utils/Utils';
export interface AnonymousUser extends FirebaseUser {}

export const initialUser: AnonymousUser = {
  displayName: '匿名ユーザー',
  avatarUrl: '',
  uid: '',
  isAnonymous: true,
  anonymousColor: '#000000',
  eventIdsParticipated: [],
  twitterId: ''
};

export type Color =
  | '#000000'
  | '#3f92e3'
  | '#548e6a'
  | '#f0b43a'
  | '#f6cce5'
  | '#51447c'
  | '#e84259';

export const COLOR_HEX = [
  '#000000',
  '#3f92e3',
  '#548e6a',
  '#f0b43a',
  '#f6cce5',
  '#51447c',
  '#e84259'
];

export const saveUser = (uid: string, user: AnonymousUser) => {
  save(uid, user);
};

export const findUser = (uid: string): AnonymousUser | null => {
  return find(uid);
};

export const registerEventIdParticipated = (uid: string, eventId: string) => {
  const u = findUser(uid);
  if (u !== null) {
    const { eventIdsParticipated = [] } = u;
    if (eventIdsParticipated.indexOf(eventId) > -1) return;
    u.eventIdsParticipated = createSetFrom(eventId, eventIdsParticipated);
    saveUser(uid, u);
  }
};

export const deleteUser = (uid: string) => {
  try {
    remove(uid);
  } catch (e) {
    console.error(e);
  }
};
