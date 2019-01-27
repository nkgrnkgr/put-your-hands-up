import * as React from 'react';
import { Event } from 'domain/Event';

export interface TabsProps {
  selectedTabIndex: number;
  event: Event;
  selectTab: (selectedTabIndex: number) => void;
}

const tabs: React.SFC<TabsProps> = ({ event, selectedTabIndex, selectTab }) => {
  return (
    <div
      className="tabs"
      style={{
        overflow: 'hidden'
      }}
    >
      <ul>
        {event.ltTitles.map((title, index) => {
          return (
            <li
              key={index}
              className={selectedTabIndex === index ? 'is-active' : ''}
            >
              <a onClick={e => selectTab(index)}>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default tabs;
