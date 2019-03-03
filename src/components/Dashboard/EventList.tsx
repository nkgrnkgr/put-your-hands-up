import * as React from 'react';
import _emptySvg from 'images/_empty.svg';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';

export interface EventListProps {
  auth: Auth;
  users: FirebaseUser[];
  events: Event[];
  addEvent: (event: Event) => void;
  firestore: Firestore;
}

const eventList: React.SFC<EventListProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="has-text-centered">
        <img src={_emptySvg} style={{ maxWidth: '80%' }} />
        <h1>
          現在参加したイベントはありません。イベント管理者にURLを配布してもらってください。
        </h1>
      </div>
    );
  }

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">参加したイベント</p>
        {events.map((event, index) => {
          return (
            <a
              key={index}
              href="#"
              className="panel-block backGroundColor-white"
            >
              {event.name}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default eventList;
