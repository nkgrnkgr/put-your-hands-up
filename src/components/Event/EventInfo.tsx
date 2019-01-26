import * as React from 'react';
import { Events, Event } from 'domain/Event';
import { match } from 'react-router';
import { getFullDate } from 'utils/DateTime';

interface Params {
  eventurl: string;
}

export interface EventInfoProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
  events: Events;
}

const eventInfo: React.SFC<EventInfoProps> = ({ events }) => {
  const event: Event = events
    ? events[0]
    : {
        id: '',
        name: '',
        url: '',
        date: 0,
        organizerUids: {},
        ltTitles: []
      };
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
