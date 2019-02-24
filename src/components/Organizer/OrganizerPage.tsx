import * as React from 'react';
import Navbar from 'containers/Navbar';
import ConfirmModal from 'containers/ConfirmModal';
import AuthWrapper from 'containers/AuthWrapper';
import AnchorLink from 'components/AnchorLink';

export interface OrganizerPageProps {
  firebase: Firebase;
  auth: Auth;
  children: React.ReactNode;
}

const organizerPage: React.SFC<OrganizerPageProps> = ({
  firebase,
  children
}) => {
  const signInWithTwitter = () => {
    firebase.login({
      provider: 'twitter',
      type: 'popup'
    });
  };

  const signInWithGoogle = () => {
    firebase.login({
      provider: 'google',
      type: 'popup'
    });
  };
  return (
    <>
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <section className="section">
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <div className="container">
          <div>
            <AuthWrapper isAuthenComponent={false}>
              <div className="notification">
                <span>この機能はログイン時のみご利用いただけます</span>
              </div>
              <div className="buttons">
                <AnchorLink
                  title={'Googleでログイン'}
                  className={'button is-link'}
                  iconClassName={'fab fa-google'}
                  handleOnClick={e => signInWithGoogle()}
                />
                <AnchorLink
                  title={'Twitterでログイン'}
                  className={'button is-info'}
                  iconClassName={'fab fa-twitter'}
                  handleOnClick={e => signInWithTwitter()}
                />
              </div>
              <div style={{ height: '300px' }}>{''}</div>
            </AuthWrapper>
            <AuthWrapper>{children}</AuthWrapper>
          </div>
        </div>
      </section>
    </>
  );
};

export default organizerPage;
