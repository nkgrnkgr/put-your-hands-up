import React, { useContext } from 'react';
import queryString, { ParsedQuery } from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
import { useTwitterIntegration } from '../../../firebase/api/twitterIntegration';
import Loading from '../../shared/components/Loading';

type Props = RouteComponentProps;

export const ApiCallbackPage: React.FC<Props> = ({ location, history }) => {
  const { userValue, setUserValue } = useContext(UserContext);
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

  setUserValue({
    ...userValue,
    user: {
      ...userValue.user,
      twitterIntegration: integration,
    },
  });

  history.push('/setting');

  return <></>;
};
