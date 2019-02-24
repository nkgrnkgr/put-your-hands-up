import { FirebaseUser } from 'domain/FirebaseUser';
import { findUser } from 'domain/Anonymous';

const userInfo = (auth: Auth): FirebaseUser => {
  if (auth.isAnonymous) {
    const user = findUser(auth.uid);
    if (user !== null) return user;
  }
  return {
    displayName: auth.isAnonymous ? '匿名ユーザー' : auth.displayName,
    avatarUrl: auth.photoURL,
    uid: auth.uid,
    isAnonymous: auth.isAnonymous,
    anonymousColor: '#000000',
    eventIdsParticipated: [],
    twitterId: ''
  };
};

export default userInfo;
