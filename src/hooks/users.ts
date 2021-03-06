import { useEffect, useMemo, useState } from 'react';
import {
  getParticipatedUsersSnapshot,
  getUser,
  addUserIfDeleted,
} from '../firebase/api/users';
import { UserModel } from '../models/User';

export const useUser = (localUser: UserModel) => {
  const { uid, isAnonymous } = localUser;
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (uid !== '') {
          const user = await getUser(uid, isAnonymous);

          if (user) {
            setUser(user);
          } else {
            await addUserIfDeleted(localUser);
            const userRefetched = await getUser(uid, isAnonymous);
            if (userRefetched) {
              setUser(user);
            }
          }
        }
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
    // eslint-disable-next-line
  }, [uid]);

  return { user, loading, error };
};

export const useParticipatedUsers = (eventId: string) => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    try {
      getParticipatedUsersSnapshot(eventId, setUsers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  return { users, loading, error };
};
