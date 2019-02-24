import * as React from 'react';
import AnchorLink from 'components/AnchorLink';

export interface LoginRequiredProps {
  firebase: Firebase;
}

const loginRequired: React.SFC<LoginRequiredProps> = ({ firebase }) => {
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
    <div>
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
    </div>
  );
};

export default loginRequired;
