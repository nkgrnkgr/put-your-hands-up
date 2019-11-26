import { IntegrationsModel } from '../models/Integrations';
import { useState, useEffect } from 'react';
import { getIntegrations } from '../firebase/api/integrations';

export const useIntegrations = (id: string) => {
  const [integrations, setIntegrations] = useState<IntegrationsModel | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (id !== '') {
          const fetchedIntegrations = await getIntegrations(id);
          setIntegrations(fetchedIntegrations);
        }
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id]);

  return { integrations, loading, error };
};
