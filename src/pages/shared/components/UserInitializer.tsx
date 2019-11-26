import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useUser } from '../../../hooks/users';
import Loading from './Loading';
import { useIntegrations } from '../../../hooks/integrations';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';

export const UserInitializer: React.FC = ({ children }) => {
  const { userValue, setUserValue } = useContext(UserContext);
  const { setIntegrations } = useContext(IntegrationsContext);
  const { uid } = userValue.user;
  const { user, loading, error } = useUser(uid);
  const {
    integrations: fetchedIntegrations,
    loading: integrationLoading,
    error: integrationError,
  } = useIntegrations(uid);

  useEffect(() => {
    if (user) {
      setUserValue({
        ...userValue,
        user,
      });
    }
    if (fetchedIntegrations) {
      setIntegrations({
        ...fetchedIntegrations,
      });
    }
  }, [user, fetchedIntegrations]);

  if (loading || integrationLoading) {
    return <Loading />;
  }

  if (error || integrationError) {
    console.error(error, integrationError);

    return <>error</>;
  }

  return <>{children}</>;
};
