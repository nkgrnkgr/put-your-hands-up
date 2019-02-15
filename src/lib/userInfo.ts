import { FirebaseUser } from 'domain/FirebaseUser';

const userInfo = (auth: Auth): FirebaseUser => {
  const user: FirebaseUser = {
    uid: auth.uid,
    displayName: auth.displayName,
    avatarUrl: auth.photoURL
  };

  if (auth.isAnonymous) {
    user.avatarUrl = 'https://bulma.io/images/placeholders/128x128.png';
    user.displayName = '匿名ユーザー';
  }
  return user;
};

export default userInfo;
