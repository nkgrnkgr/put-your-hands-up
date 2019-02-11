import * as React from 'react';
import Navbar from 'containers/Navbar';
import ConfirmModal from 'containers/ConfirmModal';
import AuthWrapper from 'containers/AuthWrapper';

export interface OrganizerPageProps {
  firebase: Firebase;
  auth: Auth;
  children: React.ReactNode;
}

const organizerPage: React.SFC<OrganizerPageProps> = ({
  firebase,
  children
}) => {
  return (
    <>
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <section className="section">
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <div className="container">
          <div>
            <AuthWrapper isAuthenComponent={false}>
              <div className="notification">
                <div className="level">
                  <span>
                    オーガナイザー向けの機能はログイン時のみご利用いただけます
                  </span>
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
              </div>
            </AuthWrapper>
            <AuthWrapper>{children}</AuthWrapper>
          </div>
        </div>
      </section>
    </>
  );
};

export default organizerPage;
