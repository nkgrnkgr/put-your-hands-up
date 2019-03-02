import * as React from 'react';
import userInfo from 'lib/userInfo';
import { signInAnonymously } from 'lib/auth';
import pyhuloge_whiteSvg from 'images/pyhuloge_white.svg';
import AuthWrapper from 'containers/AuthWrapper';
import SearchForm from 'containers/Event/SearchForm';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';
import { createNewListFrom } from 'utils/Utils';
import AnchorLink from './AnchorLink';
import UserIcon from './UserIcon';
import { Link } from 'react-router-dom';

export interface NavbarProps {
  isActiveMobileMenu: boolean;
  firebase: Firebase;
  firestore?: Firestore;
  auth: Auth;
  toggleDisplay: () => void;
  toggleMobileMenu: () => void;
  isShownSignInButtons?: boolean;
  isShownSearch?: boolean;
  isShownUserIcon?: boolean;
  isShownNavLink?: boolean;
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
  isShownSearch = true,
  isShownUserIcon = true,
  isShownNavLink = true,
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
            <img
              src={pyhuloge_whiteSvg}
              alt="put your hands up"
              style={{ height: '100px', marginRight: '10px' }}
            />
            <h1 className="BrandLogo">PutYourHandsUp</h1>
          </a>
          {isShownNavLink ? (
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
          ) : (
            ''
          )}
        </div>
        <div
          className={`navbar-menu ${isActiveMobileMenu ? 'is-active' : ''}`}
          style={{ backgroundColor: '#ff3860' }}
        >
          {isShownNavLink ? (
            <div className="navbar-start">
              <AnchorLink
                title={' DashBoard '}
                href={'/'}
                className={'navbar-item has-text-white'}
                iconClassName={'fas fa-cog'}
              />
              <AnchorLink
                title={' Organizer '}
                href={'/organizer'}
                className={'navbar-item has-text-white'}
                iconClassName={'fas fa-users-cog'}
              />
              <AnchorLink
                title={' Github '}
                href={'https://github.com/nkgrnkgr/put-your-hands-up'}
                className={'navbar-item has-text-white'}
                iconClassName={'fab fa-github'}
                isExternal={true}
              />
            </div>
          ) : (
            ''
          )}
          <hr className="navbar-divider" />
          <div className="navbar-end">
            {isShownSearch ? (
              <div className="navbar-item">
                <SearchForm />
              </div>
            ) : (
              <div className="navbar-end">
                <div className="navbar-item">
                  <Link
                    to="/dashboard"
                    className="button is-danger is-inverted is-outlined"
                  >
                    GET STARTED
                  </Link>
                </div>
              </div>
            )}
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
            {isShownUserIcon ? (
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
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
