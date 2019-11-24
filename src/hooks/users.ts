import { useEffect, useMemo, useState } from 'react';
import { UserModel, TwitterIntegration } from '../models/User';
import { getUser } from '../firebase/api/users';

export const useUser = (uid: string, isAnonymous = false) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const user = await getUser(uid, isAnonymous);
        setUser(user);
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
