import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';

const createUrl = (pathname = '', search = '') => {
  if (pathname) {
    return `${pathname}${search}`;
  }

  return 'dashboard';
};

export const PrivateRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const { pathname, search } = useLocation();
  const nextLocation = createUrl(pathname, search);

  if (user.uid === '') {
    return <Redirect to={`/signin?redirecturl=${encodeURI(nextLocation)}`} />;
  }

  return <>{children}</>;
};
