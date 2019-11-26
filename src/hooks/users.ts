import { useEffect, useMemo, useState } from 'react';
import { getParticipatedUsersSnapshot, getUser } from '../firebase/api/users';
import { UserModel } from '../models/User';

export const useUser = (uid: string, isAnonymous = false) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (uid !== '') {
          const user = await getUser(uid, isAnonymous);
          setUser(user);
        }
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
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
