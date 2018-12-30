import * as firebase from 'firebase/app';

export const signInAnonymously = () => {
  firebase.auth().languageCode = 'ja';
  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      console.error(error);
    });
};
