import { loadAnonymousUserLocalData } from '../../models/AnonymousUser';
import { UserModel } from '../../models/User';
import { uniq } from '../../utils/utils';
import { firebase, db } from '../index';

const COLLECTION_KEY = 'users';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getUser = async (uid: string, isAnonymous = false) => {
  if (isAnonymous) {
    return loadAnonymousUserLocalData();
  }
  const doc = await COLLECTION.doc(uid).get();

  return doc.data() as UserModel;
};

export const addUserIfDeleted = async (user: UserModel) => {
  // 一度削除されたユーザーは ２回目ログイン以降Firestoreに格納されない
  // ローカルUserModelをベースに復元する必要がある。ただし、EventParticipated は初期化されるので仕方ない
  await COLLECTION.doc(user.uid).set(user);
};

export const getParticipatedUsersSnapshot = (
  eventId: string,
  callback: Function,
) => {
  COLLECTION.where(
    'eventIdsParticipated',
    'array-contains',
    eventId,
  ).onSnapshot(qerySnapshot => {
    const t: UserModel[] = [];
    qerySnapshot.forEach(doc => {
      const user = doc.data() as UserModel;
      const d = {
        ...user,
      };
      t.push(d);
    });
    callback(t);
  });
};

export const updateEventIdsParticipated = (
  user: UserModel,
  eventId: string,
) => {
  const userRef = COLLECTION.doc(user.uid);
  const t = uniq<string>(user.eventIdsParticipated, eventId);

  userRef.update({
    eventIdsParticipated: t,
  });
};

// TODO: Firestoreから直接消すのではなく、Authenticationから削除し、その他諸々をバッチで削除する必要あり
export const deleteUser = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    await user.delete();
  }
};
