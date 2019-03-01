import * as React from 'react';
import Navbar from 'containers/Navbar';
import pyhuloge_blackSvg from 'images/pyhuloge_black.svg';
import _chatSvg from 'images/_chat.svg';
import { Link } from 'react-router-dom';

export interface LandingPageProps {}

const landingPage: React.SFC<LandingPageProps> = () => {
  return (
    <div className="landingpage">
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <div className="cover" style={{ height: '73px' }} />
      <section className="hero cover">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1-desktop is-size-3-mobile">
              登壇者にフィードバックしよう
            </h1>
            <img src={_chatSvg} className={'coverImage'} />
            <div className="circle" />
            <div className="level">
              <div className="level-item">
                <img src={pyhuloge_blackSvg} className={'logo'} />
                <h1 className="title is-size-2 logoTitle">PutYourHansUp</h1>
              </div>
            </div>
            <div className="has-text-centered">
              <Link
                to="/dashboard"
                className="button is-danger is-medium shadow"
              >
                GET STARTED
              </Link>
            </div>
            <div className="has-text-centered" style={{ marginTop: '20px' }}>
              <Link to="/organizer" className="button is-medium is-text">
                イベント管理者はこちら
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default landingPage;
