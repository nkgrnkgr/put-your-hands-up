import { LoginUser } from 'domain/LoginUser';
import * as firebase from 'firebase/app';

// ログインするとブラウザが暴走する
export const init = (
  login: (loginUser: LoginUser) => void,
  logout: () => void
) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // if (user.isAnonymous) {
      //   login({
      //     displayName: 'unkown',
      //     uid: user.uid,
      //     photoURL:
      //       'https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png'
      //   });
      // } else {
      //   const { uid, displayName, photoURL } = user;
      //   login({
      //     uid,
      //     displayName: displayName || '',
      //     photoURL: photoURL || ''
      //   });
      // }
      login({
        uid: user.uid,
        displayName: user.displayName || '',
        photoURL: user.photoURL || ''
      });
    } else {
      logout();
    }
  });
};

export const signInWithTwitter = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().languageCode = 'ja';
  provider.setCustomParameters({ lang: 'ja' });

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const { credential } = result;
      if (credential) {
        console.log(`result is : ${credential}`);
      }
    })
    .catch(error => {
      console.error(error.code);
      console.error(error.message);
      console.error(error.email);
      console.error(error.credential);
    });
};

export const signInAnonymously = () => {
  firebase.auth().languageCode = 'ja';
  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      console.error(error);
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('signOut');
    })
    .catch(error => {
      console.error(error);
    });
};

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  return user;
};

export const checkStatus = () => {
  const user = currentUser();
  if (user) {
    console.log('loggedIn');
    console.log(user);
  } else {
    console.log('not loggedIn');
  }
};
