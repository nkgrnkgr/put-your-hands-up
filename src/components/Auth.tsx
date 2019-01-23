import * as React from 'react';
import { Redirect } from 'react-router';
import { isLoaded, isEmpty } from 'react-redux-firebase';

interface Props {
  auth: Auth;
}

const auth: React.SFC<Props> = props => {
  const { auth, children } = props;
  return !isLoaded(auth) ? (
    <div className="container">
      <span>Loading...</span>
    </div>
  ) : isEmpty(auth) ? (
    <Redirect to={'/login'} />
  ) : (
    <>{children}</>
  );
};

export default auth;
