import * as React from 'react';
import Navbar from 'containers/Navbar';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';

export interface OrganizerPageProps {
  firebase: Firebase;
  auth: Auth;
  children: React.ReactNode;
}

const organizerPage: React.SFC<OrganizerPageProps> = ({
  firebase,
  auth,
  children
}) => {
  return (
    <>
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <section className="section">
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <div className="container">
          <div>
            {!isLoaded(auth) ? (
              <Loading />
            ) : isEmpty(auth) ? (
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
            ) : (
              children
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default organizerPage;
