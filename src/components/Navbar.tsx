import * as React from 'react';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';
import AuthWrapper from 'containers/AuthWrapper';

export interface NavbarProps {
  isActiveMobileMenu: boolean;
  firebase: Firebase;
  auth: Auth;
  toggleDisplay: () => void;
  toggleMobileMenu: () => void;
  isShownSignInButtons?: boolean;
  hasTabs?: boolean;
}

const navbarClassNames = (hasTabs: boolean) => {
  const className = hasTabs ? '' : 'is-fixed-top shadow';
  return `navbar is-danger ${className}`;
};

const navbar: React.SFC<NavbarProps> = ({
  isActiveMobileMenu = false,
  firebase,
  auth,
  toggleDisplay = () => {},
  toggleMobileMenu = () => {},
  isShownSignInButtons = true,
  hasTabs = true
}) => {
  return (
    <nav className={navbarClassNames(hasTabs)}>
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
            <a
              className="navbar-item"
              href="https://github.com/nkgrnkgr/put-your-hands-up"
            >
              <span className="icon is-small">
                <i className="fab fa-github" />
              </span>
              <span>&nbsp;Github</span>
            </a>
            <a className="navbar-item" href="/">
              <span className="icon is-small">
                <i className="fas fa-home" />
              </span>
              <span>&nbsp;Home</span>
            </a>
            <a className="navbar-item" href="/organizer">
              <span className="icon is-small">
                <i className="fas fa-users-cog" />
              </span>
              <span>&nbsp;&nbsp;For Organizer</span>
            </a>
            <a className="navbar-item" href="/help">
              <span className="icon is-small">
                <i className="fas fa-question-circle" />
              </span>
              <span>&nbsp;Help</span>
            </a>
          </div>
          <div className="navbar-end">
            <AuthWrapper isAuthenComponent={false}>
              {isShownSignInButtons ? (
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
                ''
              )}
            </AuthWrapper>
            <AuthWrapper>
              <div className="navbar-item has-dropdown is-hoverable">
                <span className="is-flex-desktop" style={{ display: 'none' }}>
                  <figure
                    className="image is-32x32"
                    style={{ marginTop: '10px' }}
                  >
                    <img
                      className="is-rounded"
                      style={{ width: 'auto' }}
                      src={userInfo(auth).photoURL}
                    />
                  </figure>
                </span>
                <div className="navbar-dropdown">
                  <a className="navbar-item" onClick={e => firebase.logout()}>
                    <span>Logout&nbsp;</span>
                    <span className="icon">
                      <i className="fas fa-sign-out-alt" />
                    </span>
                  </a>
                </div>
              </div>
            </AuthWrapper>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
