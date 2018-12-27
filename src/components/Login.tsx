import * as React from 'react';
import {
  init,
  signInWithTwitter,
  checkStatus,
  signOut,
  signInAnonymously
} from 'lib/auth';
import { LoginUser } from 'domain/LoginUser';

export interface LoginProps {
  loginUser: LoginUser;
  login: (loginUser: LoginUser) => void;
  logout: () => void;
}

const login: React.SFC<LoginProps> = ({ loginUser, login, logout }) => {
  init(login, logout);
  return (
    <div className="container">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={loginUser.photoURL} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{loginUser.displayName}</strong>{' '}
              <small>@{loginUser.uid}</small>
            </p>
          </div>
        </div>
      </article>
      <br />
      <p className="control">
        <button className="button is-link" onClick={e => signInWithTwitter()}>
          Twitter SignIn
        </button>
      </p>
      <br />
      <p className="control">
        <button
          className="button is-warning"
          onClick={e => signInAnonymously()}
        >
          Anonymous SignIn
        </button>
      </p>
      <br />
      <p className="control">
        <button className="button is-danger" onClick={e => signOut()}>
          SignOut
        </button>
      </p>
      <br />
      <p className="control">
        <button className="button is-success" onClick={e => checkStatus()}>
          Check Login Status
        </button>
      </p>
      <br />
    </div>
  );
};

export default login;
