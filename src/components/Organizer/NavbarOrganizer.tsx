import * as React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import userInfo from 'lib/userInfo';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';
import Loading from 'components/Loading';

export interface NavbarOrganizerProps {
  isActiveMobileMenu: boolean;
  firebase: Firebase;
  auth: Auth;
  toggleMobileMenu: () => void;
}

const navbarOrganizer: React.SFC<NavbarOrganizerProps> = ({
  isActiveMobileMenu = false,
  firebase,
  auth,
  toggleMobileMenu = () => {}
}) => {
  return (
    <nav className="navbar is-danger is-fixed-top shadow">
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
            <a className="navbar-item" href="/organizer">
              Organizer
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
                <Loading />
              ) : isEmpty(auth) ? (
                <span />
              ) : (
                <div>
                  <div className="buttons">
                    <a className="button" onClick={e => firebase.logout()}>
                      <span className="icon">
                        <i className="fas fa-sign-out-alt" />
                      </span>
                      <span>Logout</span>
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

export default navbarOrganizer;
