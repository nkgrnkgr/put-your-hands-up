import * as React from 'react';
import _emptySvg from 'images/_empty.svg';
import { FirebaseUser } from 'domain/FirebaseUser';
import { Event } from 'domain/Event';
import AnchorLink from 'components/AnchorLink';
import { getYearMonthDayHourMitutes } from 'utils/DateTime';

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
        <img src={_emptySvg} style={{ maxWidth: '40%' }} />
        <h3 className="title is-5">現在参加したイベントはありません。</h3>
        <h3 className="title is-5">
          イベント管理者にURLを配布してもらってください。
        </h3>
      </div>
    );
  }

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">参加したイベント</p>
        {events.map((event, index) => {
          return (
            <AnchorLink
              title={`${event.name} - ${getYearMonthDayHourMitutes(
                event.date
              )}`}
              className={'panel-block backGroundColor-white'}
              href={`events={true}/${event.url}`}
              key={index}
              isExternal={true}
            />
          );
        })}
      </nav>
    </>
  );
};

export default eventList;
