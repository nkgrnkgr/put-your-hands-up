import * as React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';

export interface NavbarProps {
  isActiveMobileMenu: boolean;
  firebase: Firebase;
  auth: Auth;
  toggleDisplay: () => void;
  toggleMobileMenu: () => void;
}

const navbar: React.SFC<NavbarProps> = ({
  isActiveMobileMenu = false,
  firebase,
  auth,
  toggleDisplay = () => {},
  toggleMobileMenu = () => {}
}) => {
  return (
    <nav className="navbar is-danger">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={put_your_hands_up_logoPng} alt="put your hands up" />
          </a>
          <a className="navbar-burger burger" onClick={toggleMobileMenu}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={`navbar-menu ${isActiveMobileMenu ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/about">
              About
            </a>
            <a
              className="navbar-item"
              href="https://github.com/nkgrnkgr/put-your-hands-up"
            >
              <span className="icon is-small">
                <i className="fab fa-github" />
              </span>
              <span>&nbsp;Github</span>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {!isLoaded(auth) ? (
                <span>Loading...</span>
              ) : isEmpty(auth) ? (
                <div className="buttons">
                  <a
                    className="button is-light"
                    onClick={e => signInAnonymously()}
                  >
                    <span className="icon">
                      <i className="fas fa-user-secret" />
                    </span>
                    <span>匿名でログイン</span>
                  </a>
                  <a
                    className="button is-info"
                    onClick={e =>
                      firebase.login({ provider: 'twitter', type: 'popup' })
                    }
                  >
                    <span className="icon">
                      <i className="fab fa-twitter" />
                    </span>
                    <span>Twitterでログイン</span>
                  </a>
                </div>
              ) : (
                <div>
                  <div className="buttons">
                    <a className="button" onClick={e => firebase.logout()}>
                      <span className="icon">
                        <i className="fas fa-sign-out-alt" />
                      </span>
                      <span>ログアウト</span>
                    </a>
                    <a className="button is-info" onClick={toggleDisplay}>
                      <span className="icon">
                        <i className="fas fa-pen" />
                      </span>
                      <span>投稿する</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          {userInfo(auth) ? (
            <span className="is-flex-desktop" style={{ display: 'none' }}>
              <figure className="image is-32x32" style={{ marginTop: '10px' }}>
                <img className="is-rounded" src={userInfo(auth).photoURL} />
              </figure>
            </span>
          ) : (
            <span />
          )}
        </div>
      </div>
    </nav>
  );
};

export default navbar;
