import * as React from 'react';
import { signInAnonymously } from 'lib/auth';
import { LoginUser } from 'domain/LoginUser';
import { isLoaded, isEmpty } from 'react-redux-firebase';

export interface LoginProps {
  loginUser: LoginUser;
  login: (loginUser: LoginUser) => void;
  logout: () => void;
  firebase: any;
  auth: any;
}

const login: React.SFC<LoginProps> = ({ loginUser, firebase, auth }) => {
  const user = {
    photoUrl: auth.photoURL,
    displayName: auth.displayName
  };

  if (auth.isAnonymous) {
    user.photoUrl = 'https://bulma.io/images/placeholders/128x128.png';
    user.displayName = '匿名ユーザー';
  }

  return (
    <div className="container">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img src={user.photoUrl} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.displayName}</strong>
            </p>
          </div>
        </div>
      </article>
      <br />
      <p className="control">
        <button
          className="button is-link"
          onClick={e => firebase.login({ provider: 'twitter', type: 'popup' })}
        >
          Twitter SignIn
        </button>
      </p>
      <br />
      <p className="control">
        <button
          className="button is-success"
          onClick={e => signInAnonymously()}
        >
          匿名ログイン
        </button>
      </p>
      <br />
      <p className="control">
        <button className="button is-danger" onClick={e => firebase.logout()}>
          ログアウト
        </button>
      </p>
      <br />
      <div>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          <span>Not Authed</span>
        ) : (
          <pre>{JSON.stringify(auth, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export default login;
