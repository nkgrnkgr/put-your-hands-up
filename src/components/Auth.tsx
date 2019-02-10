import * as React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Loading from './Loading';

interface Props {
  auth: Auth;
}

const auth: React.SFC<Props> = props => {
  const { auth, children } = props;
  return !isLoaded(auth) ? (
    <div className="container">
      <Loading />
    </div>
  ) : isEmpty(auth) ? (
    <></>
  ) : (
    <>{children}</>
  );
};

export default auth;
