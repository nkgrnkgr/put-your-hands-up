import React, { useContext } from 'react';
import queryString, { ParsedQuery } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import Loading from '../../shared/components/Loading';
import { useTwitterIntegration } from '../../../hooks/twitterIntegration';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';

type Props = RouteComponentProps;

export const ApiCallbackPage: React.FC<Props> = ({ location, history }) => {
  const { integrations, setIntegrations } = useContext(IntegrationsContext);
  const { userValue } = useContext(UserContext);
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
    return <>error</>;
  }

  // userUpdaterのかわりに、サーバー通信してTwitterIntegrationをDocumentを作る処理を実装する

  setIntegrations({
    ...integrations,
    uid: userValue.user.uid,
    twitterIntegration: integration,
  });

  history.push('/setting');

  return <></>;
};
