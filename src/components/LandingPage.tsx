import * as React from 'react';
import AnchorLink from './AnchorLink';
import Navbar from 'containers/Navbar';
import pyhulogoSvg from 'images/pyhulogo.svg';
import 'css/landingpage.css';

export interface LandingPageProps {}

const landingPage: React.SFC<LandingPageProps> = () => {
  return (
    <div className="landingpage">
      <Navbar isShownSignInButtons={false} hasTabs={false} />
      <div className="cover" style={{ height: '73px' }} />
      <section className="hero cover">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">登壇者にフィードバックしよう</h1>
            <img
              className={'logo fuwfuwa'}
              src={pyhulogoSvg}
              alt="put your hans up"
            />
            <h2 className="subtitle">Hero subtitle</h2>
          </div>
        </div>
      </section>
      <div className="container">
        <p>Home</p>
        <ul>
          <li>
            <AnchorLink title="organizer" href="/organizer" />
          </li>
          <li>
            <AnchorLink title="setting" href="/setting" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default landingPage;
