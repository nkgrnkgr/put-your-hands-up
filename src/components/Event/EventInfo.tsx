import * as React from 'react';
import { Event } from 'domain/Event';
import { getFullDate } from 'utils/DateTime';
export interface EventInfoProps {
  event: Event;
}

const eventInfo: React.SFC<EventInfoProps> = ({ event }) => {
  return (
    <article className="message">
      <div className="message-header">
        <p>{event.name}</p>
      </div>
      <div className="message-body">
        <p>
          開催日時：
          {getFullDate(event.date)}
        </p>
      </div>
    </article>
  );
};

export default eventInfo;
