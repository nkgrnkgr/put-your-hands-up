import queryString, { ParsedQuery } from 'query-string';
import { useEffect, useState } from 'react';
import { TwitterIntegration } from '../../models/User';
import { FunctionsResponse, oauthAccessToken } from './callFunctions';

export const useTwitterIntegration = (
  oauth_token: string,
  oauth_verifier: string,
) => {
  const [integration, setIntegration] = useState<TwitterIntegration>({
    screenName: '',
    accessToken: '',
    accessTokenSecret: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const param = {
    oauth_token,
    oauth_verifier,
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await oauthAccessToken(param);
        const data: FunctionsResponse = response.data;
        const body: string = data.body;
        const params: ParsedQuery<string> = queryString.parse(body);
        const { oauth_token, oauth_token_secret, screen_name } = params;

        const accessToken = typeof oauth_token === 'string' ? oauth_token : '';
        const accessTokenSecret =
          typeof oauth_token_secret === 'string' ? oauth_token_secret : '';
        const screenName = typeof screen_name === 'string' ? screen_name : '';

        setIntegration({
          screenName,
          accessToken,
          accessTokenSecret,
        });
        if (
          accessToken === '' ||
          accessTokenSecret === '' ||
          screenName === ''
        ) {
          setError(new Error());
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    load();
  }, [oauth_token, oauth_verifier]);

  return { integration, loading, error };
};