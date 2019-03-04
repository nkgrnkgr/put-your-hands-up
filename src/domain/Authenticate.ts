import * as firebase from 'firebase/app';
import { saveUser, initialUser } from './Anonymous';
class Authenticate {
  private firebase: Firebase;
  constructor(f: Firebase) {
    this.firebase = f;
  }
  public signInWithTwitter = () => {
    return this.firebase.login({
      provider: 'twitter',
      type: 'popup'
    });
    // return firebase.auth().signInWithPopup({
    //   providerId: 'twitter'
    // });
  };

  public signInWithGoogle = () => {
    return this.firebase.login({
      provider: 'google',
      type: 'popup'
    });
  };

  public signInAnonymously = async () => {
    firebase.auth().languageCode = 'ja';
    const f = await firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        console.error(error);
      });
    if (f) {
      const { user } = f;
      if (user) {
        if (user.uid) {
          saveUser(user.uid, {
            ...initialUser,
            uid: user.uid
          });
        }
      }
    }
  };
}

export default Authenticate;
