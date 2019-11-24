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

export const useUser = (uid: string, isAnonymous = false) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection(COLLECTION_KEY);

    const load = async () => {
      setLoading(true);
      try {
        if (!isAnonymous) {
          const doc = await collection.doc(uid).get();
          const userdata = doc.data() as UserModel;
          setUser({ ...userdata });
        } else {
          setUser(loadAnonymousUserLocalData());
        }
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, [uid]);

  return { user, loading, error };
};

export const useParticipatedUsers = (eventId: string) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const collection = db.collection(COLLECTION_KEY);

  useMemo(() => {
    setLoading(true);
    collection
      .where('eventIdsParticipated', 'array-contains', eventId)
      .onSnapshot(qerySnapshot => {
        const t: UserModel[] = [];
        try {
          qerySnapshot.forEach(doc => {
            const user = doc.data() as UserModel;
            const d = {
              ...user,
            };
            t.push(d);
          });
          setUsers(t);
        } catch (err) {
          setError(err);
        }
      });
    setLoading(false);
  }, [eventId]);

  return { users, loading, error };
};

export const updateTwitterIntegration = (
  uid: string,
  twitterIntegration: TwitterIntegration | null,
) => {
  const userRef = db.collection(COLLECTION_KEY).doc(uid);
  try {
    userRef.update({
      twitterIntegration:
        twitterIntegration || firebase.firestore.FieldValue.delete(),
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateEventIdsParticipated = (
  user: UserModel,
  eventId: string,
) => {
  const userRef = db.collection(COLLECTION_KEY).doc(user.uid);
  const t = uniq<string>(user.eventIdsParticipated, eventId);

  try {
    userRef.update({
      eventIdsParticipated: t,
    });
  } catch (err) {
    console.error(err);
  }
};
