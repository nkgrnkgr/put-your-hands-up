import { useEffect, useMemo, useState } from 'react';
import { UserModel, TwitterIntegration } from '../../models/User';
import { db, firebase } from '../index';
import { loadAnonymousUserLocalData } from '../../models/AnonymousUser';
import { uniq } from '../../utils/utils';

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

export const updateTwitterIntegration = (
  uid: string,
  twitterIntegration: TwitterIntegration | null,
) => {
  // todo userUpdaterのかわりに、サーバー通信してTwitterIntegrationをDocumentを作る処理を実装する
  const userRef = COLLECTION.doc(uid);
  userRef.update({
    twitterIntegration:
      twitterIntegration || firebase.firestore.FieldValue.delete(),
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
