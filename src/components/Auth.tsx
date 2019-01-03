import * as React from 'react';
import { Redirect } from 'react-router';
import { isLoaded, isEmpty } from 'react-redux-firebase';

interface Props {
  children: any;
  auth: any;
}

const auth: React.SFC<Props> = ({ auth, children }) => {
  return !isLoaded(auth) ? (
    <span>Loading...</span>
  ) : isEmpty(auth) ? (
    <Redirect to={'/login'} />
  ) : (
    // <pre>{JSON.stringify(auth, null, 2)}</pre>
    children
  );
};

export default auth;
