import * as React from 'react';
import AnchorLink from 'components/AnchorLink';
import Authenticator from 'domain/Authenticator';
import * as H from 'history';

export interface LoginRequiredProps {
  firebase: Firebase;
  firestore: Firestore;
  canLoginAnonymously?: boolean;
  history?: H.History;
}

const loginRequired: React.SFC<LoginRequiredProps> = ({
  firebase,
  firestore,
  canLoginAnonymously = false,
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
    <div>
      <div className="notification">
        <span>この機能はログイン時のみご利用いただけます</span>
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
        {canLoginAnonymously ? (
          <AnchorLink
            title={'匿名でログイン'}
            className={'button is-light'}
            iconClassName={'fas fa-user-secret'}
            handleOnClick={e => anonyMouslySingIn()}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default loginRequired;
