import * as React from 'react';
import Navbar from 'containers/Navbar';
import ConfirmModal from 'containers/ConfirmModal';
import AuthWrapper from 'containers/AuthWrapper';
import AnchorLink from 'components/AnchorLink';
import Authenticate from 'domain/Authenticate';

export interface DashboardPageProps {
  firebase: Firebase;
  children: React.ReactNode;
}

const dashboardPage: React.SFC<DashboardPageProps> = ({
  firebase,
  children
}) => {
  const authenticate = new Authenticate(firebase);
  return (
    <>
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <section className="section">
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <div className="container">
          <div>
            <AuthWrapper isAuthenComponent={false}>
              <div className="notification">
                <span>ログインしてください</span>
              </div>
              <div className="buttons">
                <AnchorLink
                  title={'Googleでログイン'}
                  className={'button is-link'}
                  iconClassName={'fab fa-google'}
                  handleOnClick={e => authenticate.signInWithGoogle()}
                />
                <AnchorLink
                  title={'Twitterでログイン'}
                  className={'button is-info'}
                  iconClassName={'fab fa-twitter'}
                  handleOnClick={e => authenticate.signInWithTwitter()}
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

export default dashboardPage;
