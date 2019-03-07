import * as React from 'react';
import Navbar from 'containers/Navbar';
import pyhuloge_pinkSvg from 'images/pyhuloge_pink.svg';
import _candidateSvg from 'images/_candidate.svg';
import _groupChatSvg from 'images/_groupChat.svg';
import _realtimeSvg from 'images/_realtime.svg';
import _accessSvg from 'images/_access.svg';
import d1Png from 'images/d1.png';
import d2Png from 'images/d2.png';
import d7Png from 'images/d7.png';
import s1Png from 'images/s1.png';
import s2Png from 'images/s2.png';
import { Link } from 'react-router-dom';
import AnchorLink from './AnchorLink';

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
            <p className="is-size-5">
              <span className="logoTitle is-size-4">PutYourHansUp </span>は
              <span className="has-text-weight-bold">誰でも気軽に</span>
              勉強会の登壇者にフィードバックができる
              <span className="has-text-weight-bold">
                グループチャットライク
              </span>
              なサービスです
            </p>
            <div style={{ height: '40px' }} />
            <div className="has-text-centered">
              <Link
                to="/dashboard"
                className="button is-danger is-medium shadow"
              >
                GET STARTED
              </Link>
            </div>
            <div className="has-text-centered" style={{ marginTop: '20px' }}>
              <AnchorLink
                title="Demo Page"
                href="https://stagepyhu.nkgr.app/events/b8829a6a-5385-4550-b8ad-bc078b578ac7"
                className="button is-rounded is-dark"
                isExternal={true}
              />
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
      <section className="hero-body" id="howtouse">
        <div className="container has-text-centered">
          <div className="subtitle section">How to use</div>
          <h1 className="title is-size-1-desktop is-size-3-mobile">1</h1>
          <h1 className="title is-size-2-desktop is-size-4-mobile">
            Create a Event.
          </h1>
          <p className="is-size-5">
            管理者はイベント用ページを作成し、参加者にイベント用
            <span className="has-text-weight-bold">URLを参加者にSHARE</span>
            してください。
          </p>
          <p style={{ margin: '20px 0px' }}>
            <Link
              to="/organizer"
              className="button is-medium is-outlined is-rounded"
            >
              イベント管理者ページへ
            </Link>
          </p>
          <div className="columns is-centered">
            <div className="column is-two-thirds-desktop">
              <img src={d1Png} className={'howToImage shadow-cover'} />
              <img src={d2Png} className={'howToImage shadow-cover'} />
            </div>
          </div>
          <div style={{ height: '100px' }} />

          <h1 className="title is-size-1-desktop is-size-3-mobile">2</h1>
          <h1 className="title is-size-2-desktop is-size-4-mobile">
            Join the Event.
          </h1>
          <p className="is-size-5">参加者はURLからイベントに参加してください</p>
          <p className="is-size-5">
            Twitter, Google そして
            <span className="has-text-weight-bold">匿名</span>
            でログインができます。
          </p>
          <div className="columns is-centered" style={{ marginBottom: '20px' }}>
            <div className="column is-half-desktop">
              <img src={_accessSvg} className={'howToImage-min'} />
            </div>
          </div>
          <div className="columns is-centered is-mobile">
            <div className="column is-one-third-mobile">
              <span className="icon has-text-info">
                <i className="fab fa-twitter" style={{ fontSize: '60px' }} />
              </span>
            </div>
            <div className="column is-one-third-mobile">
              <span className="icon has-text-link">
                <i className="fab fa-google" style={{ fontSize: '60px' }} />
              </span>
            </div>
            <div className="column is-one-third-mobile">
              <span className="icon has-text-dark">
                <i
                  className="fas fa-user-secret"
                  style={{ fontSize: '60px' }}
                />
              </span>
            </div>
          </div>
          <div style={{ height: '100px' }} />

          <h1 className="title is-size-1-desktop is-size-3-mobile">3</h1>
          <h1 className="title is-size-2-desktop is-size-4-mobile">
            Feedback to Speakers!
          </h1>
          <p className="is-size-5">登壇者にフィードバックしてください。</p>
          <p className="is-size-5">
            投稿は全ての参加者に
            <span className="has-text-weight-bold">リアルタイムに</span>
            配信されます
          </p>
          <div className="columns is-centered">
            <div className="column is-one-thirds-desktop">
              <img src={_realtimeSvg} className={'howToImage-min'} />
            </div>
          </div>
          <img src={s1Png} className={'howToImage-v shadow-cover-v'} />
          <img src={s2Png} className={'howToImage-v shadow-cover-v'} />
          <div className="columns is-centered">
            <div className="column is-two-thirds-desktop">
              <img src={d7Png} className={'howToImage shadow-cover-v'} />
            </div>
          </div>
          <div style={{ height: '100px' }} />
        </div>
        <div className="has-text-centered">
          <Link to="/dashboard" className="button is-danger is-medium shadow">
            GET STARTED
          </Link>
        </div>
        <div className="has-text-centered" style={{ marginTop: '20px' }}>
          <Link to="/organizer" className="button is-medium is-text">
            イベント管理者はこちら
          </Link>
        </div>
      </section>
    </div>
  );
};

export default landingPage;
