import { FirebaseUser } from './FirebaseUser';
import { find, save, remove } from 'lib/localStorageAcsser';
export interface AnonymousUser extends FirebaseUser {}

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

export const deleteUser = (uid: string) => {
  try {
    remove(uid);
  } catch (e) {
    console.error(e);
  }
};
