import * as React from 'react';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';
// import googleSignInPng from 'images/googleSignIn.png';
import AuthWrapper from 'containers/AuthWrapper';
import SearchForm from 'containers/Event/SearchForm';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';
import { createNewListFrom } from 'utils/Utils';
import AnchorLink from './AnchorLink';

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
  const registerUid = (uid: string) => {
    if (event) {
      if (firestore && firestore.update) {
        firestore.update(
          { collection: 'users', doc: uid },
          {
            uid
          }
        );
      }
    }
  };

  const registerEventId = async (uid: string) => {
    if (event) {
      if (firestore && firestore.get && firestore.update) {
        const user = await firestore.get({ collection: 'users', doc: uid });
        firestore.update(
          { collection: 'users', doc: uid },
          {
            eventIdsParticipated: createNewListFrom(
              event.id,
              user.eventIdsParticipated
            )
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
      await registerUid(user.uid);
      await registerEventId(user.uid);
    }
  };

  const signInWithGoogle = async () => {
    const loginedInfo = await firebase.login({
      provider: 'google',
      type: 'popup'
    });
    const user: FirebaseUser = loginedInfo.user;
    if (user) {
      await registerUid(user.uid);
      await registerEventId(user.uid);
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
            <AnchorLink
              title={'Home'}
              href={'/'}
              className={'navbar-item'}
              iconClassName={'fas fa-home'}
            />
            <AnchorLink
              title={'For Organizer'}
              href={'/organizer'}
              className={'navbar-item'}
              iconClassName={'fas fa-users-cog'}
            />
            <AnchorLink
              title={'Github'}
              href={'https://github.com/nkgrnkgr/put-your-hands-up'}
              className={'navbar-item'}
              iconClassName={'fab fa-github'}
              isExternal={true}
            />
          </div>
          <div className="navbar-end is-danger">
            <div className="navbar-item">
              <SearchForm />
            </div>
            <AuthWrapper isAuthenComponent={false}>
              {isShownSignInButtons ? (
                <div className="buttons">
                  <AnchorLink
                    title={'匿名でログイン'}
                    className={'button is-light'}
                    iconClassName={'fas fa-user-secret'}
                    handleOnClick={e => signInAnonymously()}
                  />
                  <AnchorLink
                    title={'Googleでログイン'}
                    className={'button is-link'}
                    iconClassName={'fab fa-google'}
                    handleOnClick={e => signInWithGoogle()}
                  />
                  {/* <a onClick={e => signInWithGoogle()}>
                    <img
                      src={googleSignInPng}
                      alt="sign in with google"
                      style={{
                        height: '42px',
                        borderRadius: '10px',
                        marginRight: '10px'
                      }}
                    />
                  </a> */}
                  <AnchorLink
                    title={'Twitterでログイン'}
                    className={'button is-info'}
                    iconClassName={'fab fa-twitter'}
                    handleOnClick={e => signInWithTwitter()}
                  />
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
                  <AnchorLink
                    title={' Logout '}
                    className={'button is-light'}
                    iconClassName={'fas fa-sign-out-alt'}
                    handleOnClick={e => firebase.logout()}
                  />
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
