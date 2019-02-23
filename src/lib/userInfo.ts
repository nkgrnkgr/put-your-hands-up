import { FirebaseUser } from 'domain/FirebaseUser';

const userInfo = (auth: Auth): FirebaseUser => {
  const user: FirebaseUser = {
    uid: auth.uid,
    displayName: auth.displayName,
    avatarUrl: auth.photoURL,
    isAnonymous: auth.isAnonymous
  };

  if (auth.isAnonymous) {
    user.displayName = '匿名ユーザー';
  }
  return user;
};

export default userInfo;
