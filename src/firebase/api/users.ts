import { db } from '../index';
import { UserModel, TwitterIntegration } from '../../models/User';
import { useState, useEffect, useMemo } from 'react';
import { oauthAcccessToken, FunctionsResponse } from './callFunctions';
import queryString, { ParsedQuery } from 'query-string';

export const useUser = (uid: string) => {
  const [user, setUser] = useState<UserModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection('users');

    const load = async () => {
      setLoading(true);
      try {
        const doc = await collection.doc(uid).get();
        const userdata = doc.data() as UserModel;
        setUser({ ...userdata });
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

  const collection = db.collection('users');

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
