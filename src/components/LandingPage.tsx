import * as React from 'react';
import Navbar from 'containers/Navbar';
import pyhuloge_pinkSvg from 'images/pyhuloge_pink.svg';
import _candidateSvg from 'images/_candidate.svg';
import _groupChatSvg from 'images/_groupChat.svg';
import { Link } from 'react-router-dom';

export interface LandingPageProps {}

const landingPage: React.SFC<LandingPageProps> = () => {
  return (
    <div className="landingpage">
      <Navbar
        isShownSignInButtons={false}
        hasTabs={false}
        isShownNavLink={false}
        isShownSearch={false}
        isShownUserIcon={false}
      />
      <div className="cover" style={{ height: '73px' }} />
      <section className="hero cover">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1-desktop is-size-3-mobile">
              登壇者にフィードバックしよう
            </h1>
            <img src={_candidateSvg} className={'coverImage'} />
            <img src={_groupChatSvg} className={'coverImage'} />
            <div style={{ height: '40px' }} />
            <div className="level">
              <div className="level-item">
                <img src={pyhuloge_pinkSvg} className={'logo'} />
                <h1 className="title is-size-3 logoTitle">PutYourHandsUp</h1>
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
            <div className="has-text-centered" style={{ marginTop: '20px' }}>
              <a
                className="github-button"
                href="https://github.com/nkgrnkgr/put-your-hands-up"
                data-size="large"
                data-show-count="true"
                aria-label="Star nkgrnkgr/put-your-hands-up on GitHub"
              >
                Star
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default landingPage;
