import * as React from 'react';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';
import AuthWrapper from 'containers/AuthWrapper';
import SearchForm from 'containers/Event/SearchForm';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';

export interface NavbarProps {
  isActiveMobileMenu: boolean;
  firebase: Firebase;
  firestore?: Firestore;
  auth: Auth;
  toggleDisplay: () => void;
  toggleMobileMenu: () => void;
  isShownSignInButtons?: boolean;
  hasTabs?: boolean;
  event?: Event;
}

const navbarClassNames = (hasTabs: boolean) => {
  const className = hasTabs ? '' : 'is-fixed-top shadow';
  return `navbar is-danger ${className}`;
};

const navbar: React.SFC<NavbarProps> = ({
  isActiveMobileMenu = false,
  firebase,
  firestore,
  auth,
  toggleDisplay = () => {},
  toggleMobileMenu = () => {},
  isShownSignInButtons = true,
  hasTabs = true,
  event
}) => {
  // const addParticipantIdToEvent = (event: Event, uid: string) => {
  //   if (firestore && firestore.set) {
  //     const { participantIds } = event;
  //     let ids = [];
  //     if (participantIds) {
  //       ids = [...participantIds, uid];
  //     } else {
  //       ids.push(uid);
  //     }
  //     firestore.update(
  //       { collection: 'events', doc: event.id },
  //       {
  //         participantIds: ids
  //       }
  //     );
  //   }
  // };

  const updateUserUid = (user: FirebaseUser, event?: Event) => {
    const { uid, eventIdsParticipated } = user;
    if (event) {
      let ids = [];
      if (eventIdsParticipated) {
        ids = [...eventIdsParticipated, event.id];
      } else {
        ids.push(event.id);
      }
      if (firestore && firestore.set) {
        firestore.update(
          { collection: 'users', doc: uid },
          {
            uid,
            eventIdsParticipated: [...ids]
          }
        );
      }
    }
  };

  const signInWithTwitter = async () => {
    const loginedInfo = await firebase.login({
      provider: 'twitter',
      type: 'popup'
    });
    const user: FirebaseUser = loginedInfo.user;
    if (user) {
      updateUserUid(user);
    }
  };
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
              <SearchForm />
            </div>
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
                    onClick={e => signInWithTwitter()}
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
                    style={{ marginTop: '12px' }}
                  >
                    <img
                      className="is-rounded"
                      style={{ width: 'auto' }}
                      src={userInfo(auth).avatarUrl}
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
