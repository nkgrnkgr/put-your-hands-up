import React, { useContext, useState } from 'react';
import queryString, { ParsedQuery } from 'query-string';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useTwitterIntegration } from '../../../firebase/api/twitterIntegration';
import Loading from '../../shared/components/Loading';
import { UserContext } from '../../../contexts/UserContext';
import { useScrollTrigger } from '@material-ui/core';

type Props = RouteComponentProps;

export const ApiCallbackPage: React.FC<Props> = ({ location, history }) => {
  const params: ParsedQuery<string> = queryString.parse(location.search);
  const { oauth_token, oauth_verifier } = params;

  const oauthToken = typeof oauth_token === 'string' ? oauth_token : '';
  const oauthVerifier =
    typeof oauth_verifier === 'string' ? oauth_verifier : '';

  const { integration, loading, error } = useTwitterIntegration(
    oauthToken,
    oauthVerifier,
  );

  const { userValue, setUserValue } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  console.log(integration, error);
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
