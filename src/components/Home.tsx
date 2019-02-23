import * as React from 'react';
import AnchorLink from './AnchorLink';

export interface HomeProps {}

const home: React.SFC<HomeProps> = () => {
  return (
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
  );
};

export default home;
