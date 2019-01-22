import * as React from 'react';
import NavbarOrganizer from 'containers/Organizer/NavbarOrganizer';
import { isLoaded, isEmpty } from 'react-redux-firebase';

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
      <NavbarOrganizer />
      <section className="section">
        <div className="container">
          <div>
            {!isLoaded(auth) ? (
              <span>Loading...</span>
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
