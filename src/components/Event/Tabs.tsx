import * as React from 'react';
import { Event } from 'domain/Event';

export interface TabsProps {
  event: Event;
}

const tabs: React.SFC<TabsProps> = ({ event }) => {
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
            <li key={index}>
              <a>{title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default tabs;
