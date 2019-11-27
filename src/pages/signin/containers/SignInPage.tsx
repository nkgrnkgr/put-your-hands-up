import React, { useContext } from 'react';
import { SignInPage as Component } from '../components/SignInPage';
import { UserContext } from '../../../contexts/UserContext';
import { useHistory } from 'react-router';

export const SignInPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  if (user.uid !== '') {
    history.push('/dashboard');
  }

  return <Component />;
};
