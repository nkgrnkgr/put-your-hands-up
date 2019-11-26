import { firebase } from '../index';
import { remove, find } from '../../utils/localStorageAccessor';

export const signInWithAnonyMously = () => {
  firebase.auth().signInAnonymously();
};

const signInWith = (provider: firebase.auth.AuthProvider) => {
  firebase.auth().signInWithRedirect(provider);
};

export const signInWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  signInWith(provider);
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWith(provider);
};

export const signOut = () => {
  const user = find('user');
  if (user) {
    remove('user');
  }
  firebase.auth().signOut();
  window.location.href = '/';
};
