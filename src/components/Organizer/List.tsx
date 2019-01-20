import * as React from 'react';
import { Event } from 'domain/Event';
import Box from './Box';
import { decrement } from 'utils/DateTime';

export interface ListProps {
  events: Event[];
  auth: any;
  firestore: any;
}

const isPast = (date: number): boolean => {
  const ago24hour = decrement(new Date().getTime(), 1, 'day');
  return ago24hour - date > 0;
};

const list: React.SFC<ListProps> = ({ events }) => {
  return (
    <div>
      <h2>Events</h2>
      <div>
        <pre>{JSON.stringify(events, undefined, 2)}</pre>
      </div>
      <h3>次回イベント</h3>
      <div>
        {events
          ? events
              .filter((event, index, array) => {
                return !isPast(event.date);
              })
              .map((event, index) => {
                return <Box key={index} event={event} />;
              })
          : ''}
      </div>
      <h3>終了したイベント</h3>
      <div>
        {events
          ? events
              .filter((event, index, array) => {
                return isPast(event.date);
              })
              .map((event, index) => {
                return <Box key={index} event={event} />;
              })
          : ''}
      </div>
    </div>
  );
};

export default list;
