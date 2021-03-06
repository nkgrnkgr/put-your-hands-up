import queryString, { ParsedQuery } from 'query-string';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { UserContext } from '../../../contexts/UserContext';
import { addOrUpdateIntegrations } from '../../../firebase/api/integrations';
import { useTwitterIntegration } from '../../../hooks/twitterIntegration';
import Loading from '../../shared/components/Loading';

type Props = RouteComponentProps;

export const ApiCallbackPage: React.FC<Props> = ({ location, history }) => {
  const { integrations, setIntegrations } = useContext(IntegrationsContext);
  const { callNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const params: ParsedQuery<string> = queryString.parse(location.search);
  const { oauth_token, oauth_verifier } = params;

  const oauthToken = typeof oauth_token === 'string' ? oauth_token : '';
  const oauthVerifier =
    typeof oauth_verifier === 'string' ? oauth_verifier : '';

  const { integration, loading, error } = useTwitterIntegration(
    oauthToken,
    oauthVerifier,
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    callNotification(
      'Twitter連携に失敗しました。ページをリロードしてやり直してください',
      'error',
    );
  }

  try {
    addOrUpdateIntegrations({
      id: user.uid,
      twitterIntegration: integration,
    });
    setIntegrations({
      ...integrations,
      id: user.uid,
      twitterIntegration: integration,
    });
  } catch (error) {
    callNotification(
      'Twitter連携に失敗しました。ページをリロードしてやり直してください',
      'error',
    );
  }

  history.push('/setting');

  return <></>;
};
