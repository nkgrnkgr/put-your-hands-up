import * as React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Loading from './Loading';

export interface AuthWrapperProps {
  auth: Auth;
  isAuthenComponent?: boolean;
}

const auth: React.SFC<AuthWrapperProps> = ({
  auth,
  isAuthenComponent = true,
  children
}) => {
  if (!isLoaded(auth)) {
    return <Loading />;
  }
  if (isEmpty(auth)) {
    return isAuthenComponent ? <></> : <>{children}</>;
  }
  return isAuthenComponent ? <>{children}</> : <></>;
};

export default auth;
