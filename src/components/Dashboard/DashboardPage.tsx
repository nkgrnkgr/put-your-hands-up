import * as React from 'react';
import Navbar from 'containers/Navbar';
import ConfirmModal from 'containers/ConfirmModal';
import AuthWrapper from 'containers/AuthWrapper';
import AnchorLink from 'components/AnchorLink';
import Authenticator from 'domain/Authenticator';
import * as H from 'history';

export interface DashboardPageProps {
  firebase: Firebase;
  firestore: Firestore;
  children: React.ReactNode;
  history: H.History;
}

const dashboardPage: React.SFC<DashboardPageProps> = ({
  firebase,
  firestore,
  children,
  history
}) => {
  const authenticator = new Authenticator(firebase, firestore);
  const anonyMouslySingIn = () => {
    authenticator.signInAnonymously();
    if (history) {
      history.push('/setting');
    }
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
                <span>ログインしてください</span>
              </div>
              <div className="buttons">
                <AnchorLink
                  title={'Googleでログイン'}
                  className={'button is-link'}
                  iconClassName={'fab fa-google'}
                  handleOnClick={e => authenticator.signInWithGoogle()}
                />
                <AnchorLink
                  title={'Twitterでログイン'}
                  className={'button is-info'}
                  iconClassName={'fab fa-twitter'}
                  handleOnClick={e => authenticator.signInWithTwitter()}
                />
                <AnchorLink
                  title={'匿名でログイン'}
                  className={'button is-light'}
                  iconClassName={'fas fa-user-secret'}
                  handleOnClick={e => anonyMouslySingIn()}
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
