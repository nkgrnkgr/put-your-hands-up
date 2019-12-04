import queryString, { ParsedQuery } from 'query-string';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import { SignInPage as Component } from '../components/SignInPage';

export const SignInPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const params: ParsedQuery<string> = queryString.parse(window.location.search);
  const { redirecturl } = params;
  const history = useHistory();
  if (user.uid !== '') {
    history.push(`${redirecturl || '/dashboard'}`);
  }

  return <Component />;
};
