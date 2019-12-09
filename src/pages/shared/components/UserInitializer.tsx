import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useUser } from '../../../hooks/users';
import Loading from './Loading';
import { useIntegrations } from '../../../hooks/integrations';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { NotificationContext } from '../../../contexts/NotificationContext';

export const UserInitializer: React.FC = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const { setIntegrations } = useContext(IntegrationsContext);
  const { user: fetchedUser, loading, error } = useUser(user);
  const {
    integrations: fetchedIntegrations,
    loading: integrationLoading,
    error: integrationError,
  } = useIntegrations(user.uid);
  const { callNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
    if (fetchedIntegrations) {
      setIntegrations(fetchedIntegrations);
    }
  }, [user, fetchedIntegrations]);

  if (loading || integrationLoading) {
    return <Loading />;
  }

  if (error || integrationError) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <>{children}</>;
};
