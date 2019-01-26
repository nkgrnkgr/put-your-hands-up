import * as React from 'react';

export interface TabsProps {}

const tabs: React.SFC<TabsProps> = () => {
  return (
    <div className="tabs">
      <ul>
        <li className="is-active">
          <a>Pictures</a>
        </li>
        <li>
          <a>Music</a>
        </li>
        <li>
          <a>Videos</a>
        </li>
        <li>
          <a>Documents</a>
        </li>
      </ul>
    </div>
  );
};

export default tabs;
