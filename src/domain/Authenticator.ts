import * as firebase from 'firebase/app';
import { saveUser, initialUser } from './Anonymous';
import { registerUid, fetchUser, registerEventId } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';

interface ProviderInfo {
  provider: string;
  type: string;
}

class Authenticator {
  private firebase: Firebase;
  private firestore: Firestore;
  constructor(fb: Firebase, fs: Firestore) {
    this.firebase = fb;
    this.firestore = fs;
  }

  private signIn = async (providerInfo: ProviderInfo, event?: Event) => {
    const info = await this.firebase.login(providerInfo);
    const { user } = info;
    if (user) {
      await registerUid(this.firestore, user.uid);
      const u = await fetchUser(this.firestore, user.uid);
      if (event && u !== null) {
        await registerEventId(this.firestore, u, event.id);
      }
    }
  };

  public signInWithTwitter = (event?: Event) => {
    this.signIn({ provider: 'twitter', type: 'popup' }, event);
  };

  public signInWithGoogle = (event?: Event) => {
    this.signIn({ provider: 'google', type: 'popup' }, event);
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

export default Authenticator;
