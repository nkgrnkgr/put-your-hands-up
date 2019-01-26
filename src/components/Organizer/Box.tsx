import * as React from 'react';
import { Event } from 'domain/Event';
import { getFullDate } from 'utils/DateTime';
import { eventsUrl } from 'utils/Url';

export interface BoxProps {
  event: Event;
  firestore: Firestore;
  toggleDisplay: () => void;
  setOkAction: (okAction: () => void) => void;
  setNgAction: (ngAction: () => void) => void;
}

const box: React.SFC<BoxProps> = ({
  event,
  firestore,
  toggleDisplay,
  setOkAction
}) => {
  const deleteEvent = (id: string): void => {
    setOkAction(() => {
      firestore.delete({ collection: 'events', doc: id });
    });
    toggleDisplay();
  };
  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <h4 className="strong">{event.name}</h4>
            <p>開催日時 : {getFullDate(event.date)}</p>
            <p>
              URL :{' '}
              <a href={eventsUrl(event.url)} target="_blank">
                {eventsUrl(event.url)}
              </a>
            </p>
            <p>登壇タイトル</p>
            <ul>
              {event.ltTitles.map((title, index) => {
                return <li key={index}>{title}</li>;
              })}
            </ul>
            <div className="level-left">
              <div className="level-item">
                <a href={`/organizer/edit/${event.id}`} className="button">
                  <span className="icon is-small">
                    <i className="fas fa-edit" aria-hidden="true" />
                  </span>
                  <span>編集</span>
                </a>
              </div>
              <div className="level-item">
                <a
                  className="button is-danger"
                  onClick={e => deleteEvent(event.id)}
                >
                  <span className="icon is-small">
                    <i className="far fa-trash-alt" aria-hidden="true" />
                  </span>
                  <span>削除</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default box;
