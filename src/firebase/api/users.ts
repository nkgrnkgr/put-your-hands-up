import { loadAnonymousUserLocalData } from '../../models/AnonymousUser';
import { UserModel } from '../../models/User';
import { uniq } from '../../utils/utils';
import { db } from '../index';

const COLLECTION_KEY = 'users';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getUser = async (uid: string, isAnonymous = false) => {
  if (isAnonymous) {
    return loadAnonymousUserLocalData();
  }
  const doc = await COLLECTION.doc(uid).get();

  return doc.data() as UserModel;
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
// export const deleteUser = async (uid: string) => {
//   const collection = db.collection(COLLECTION_KEY);
//   const userRef = collection.doc(uid);
//   await userRef.delete();
// };
