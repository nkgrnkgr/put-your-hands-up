import * as React from 'react';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import put_your_hands_up_logoPng from 'images/put_your_hands_up_logo.png';
import AuthWrapper from 'containers/AuthWrapper';
import SearchForm from 'containers/Event/SearchForm';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';
import { createNewListFrom } from 'utils/Utils';
import AnchorLink from './AnchorLink';
import UserIcon from './UserIcon';

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
          <a
            className={`navbar-burger burger ${
              isActiveMobileMenu ? 'is-active' : ''
            }`}
            onClick={toggleMobileMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div
          className={`navbar-menu ${isActiveMobileMenu ? 'is-active' : ''}`}
          style={{ backgroundColor: '#ff3860' }}
        >
          <div className="navbar-start">
            <AnchorLink
              title={'Home'}
              href={'/'}
              className={'navbar-item has-text-white'}
              iconClassName={'fas fa-home'}
            />
            <AnchorLink
              title={'For Organizer'}
              href={'/organizer'}
              className={'navbar-item has-text-white'}
              iconClassName={'fas fa-users-cog'}
            />
            <AnchorLink
              title={'Github'}
              href={'https://github.com/nkgrnkgr/put-your-hands-up'}
              className={'navbar-item has-text-white'}
              iconClassName={'fab fa-github'}
              isExternal={true}
            />
          </div>
          <hr className="navbar-divider" />
          <div className="navbar-end">
            <div className="navbar-item">
              <SearchForm />
            </div>
            {isShownSignInButtons ? (
              <AuthWrapper isAuthenComponent={false}>
                <div className="navbar-item">
                  <AnchorLink
                    title={'匿名でログイン'}
                    className={'button is-light'}
                    iconClassName={'fas fa-user-secret'}
                    handleOnClick={e => signInAnonymously()}
                  />
                </div>
                <div className="navbar-item">
                  <AnchorLink
                    title={'Googleでログイン'}
                    className={'button is-link'}
                    iconClassName={'fab fa-google'}
                    handleOnClick={e => signInWithGoogle()}
                  />
                </div>
                <div className="navbar-item">
                  <AnchorLink
                    title={'Twitterでログイン'}
                    className={'button is-info'}
                    iconClassName={'fab fa-twitter'}
                    handleOnClick={e => signInWithTwitter()}
                  />
                </div>
              </AuthWrapper>
            ) : (
              ''
            )}
            <AuthWrapper>
              <div className="navbar-item has-dropdown is-hoverable">
                <span className="is-flex-desktop" style={{ display: 'none' }}>
                  <UserIcon
                    isRoundedImg={true}
                    user={userInfo(auth)}
                    customStyleForFigure={{
                      marginTop: '22px'
                    }}
                    customStyleForImg={{
                      width: 'auto',
                      backgroundColor: '#ffffff'
                    }}
                  />
                </span>
                <div className="navbar-dropdown">
                  <div className="navbar-item">
                    <AnchorLink
                      title={' Logout '}
                      className={'button is-light'}
                      iconClassName={'fas fa-sign-out-alt'}
                      handleOnClick={e => firebase.logout()}
                    />
                  </div>
                  <div className="navbar-item">
                    <AnchorLink
                      title={' Setting '}
                      className={'button is-light'}
                      iconClassName={'fas fa-cog'}
                      href={'/setting'}
                    />
                  </div>
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
