import * as React from 'react';
import { Event } from 'domain/Event';
import Box from 'containers/Organizer/Box';
import { decrement } from 'utils/DateTime';

export interface ListProps {
  events: Event[];
  auth: Auth;
  firestore: Firestore;
}

const isPast = (date: number): boolean => {
  const ago24hour = decrement(new Date().getTime(), 1, 'day');
  return ago24hour - date > 0;
};

const list: React.SFC<ListProps> = ({ events }) => {
  return (
    <div>
      <h1 className="title is-1">イベントの管理</h1>
      <a href="/organizer/create" className="button is-success">
        <span className="icon is-small">
          <i className="fas fa-plus" aria-hidden="true" />
        </span>
        <span>新規イベントを作成する</span>
      </a>
      <hr />
      <h3 className="title is-3">次回イベント</h3>
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
      <hr />
      <h3 className="title is-3">終了したイベント</h3>
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
      <hr />
    </div>
  );
};

export default list;
