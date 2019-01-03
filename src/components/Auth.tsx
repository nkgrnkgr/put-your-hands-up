import * as React from 'react';
import { Redirect } from 'react-router';
import { isLoaded, isEmpty } from 'react-redux-firebase';

interface Props {
  children: any;
  auth: any;
}

const auth: React.SFC<Props> = ({ auth, children }) => {
  return !isLoaded(auth) ? (
    <div className="container">
      <span>Loading...</span>
    </div>
  ) : isEmpty(auth) ? (
    <Redirect to={'/login'} />
  ) : (
    children
  );
};

export default auth;
