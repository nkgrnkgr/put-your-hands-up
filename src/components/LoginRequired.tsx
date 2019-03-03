import * as React from 'react';
import AnchorLink from 'components/AnchorLink';
import Authenticate from 'domain/Authenticate';

export interface LoginRequiredProps {
  firebase: Firebase;
}

const loginRequired: React.SFC<LoginRequiredProps> = ({ firebase }) => {
  const authenticate = new Authenticate(firebase);

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
          handleOnClick={e => authenticate.signInWithGoogle()}
        />
        <AnchorLink
          title={'Twitterでログイン'}
          className={'button is-info'}
          iconClassName={'fab fa-twitter'}
          handleOnClick={e => authenticate.signInWithTwitter()}
        />
      </div>
    </div>
  );
};

export default loginRequired;
