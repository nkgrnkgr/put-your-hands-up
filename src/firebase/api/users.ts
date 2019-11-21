import { useEffect, useMemo, useState } from 'react';
import { UserModel, TwitterIntegration } from '../../models/User';
import { db, firebase } from '../index';
import { loadAnonymousUserLocalData } from '../../models/AnonymousUser';

const COLLECTION_KEY = 'users';

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
