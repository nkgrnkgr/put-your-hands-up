import { FirebaseUser } from './FirebaseUser';
import { find, save, remove } from 'lib/localStorageAcsser';
export interface AnonymousUser extends FirebaseUser {}

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
