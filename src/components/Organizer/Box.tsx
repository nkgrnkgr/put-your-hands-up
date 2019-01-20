import * as React from 'react';
import { Event } from 'domain/Event';
import { getFullDate } from 'utils/DateTime';

export interface BoxProps {
  event: Event;
}

const box: React.SFC<BoxProps> = ({ event }) => {
  return (
    <div className="box">
      <article className="media">
        {/* <div className="media-left">
          <figure className="image is-64x64">
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt="Image"
            />
          </figure>
        </div> */}
        <div className="media-content">
          <div className="content">
            <h4 className="strong">{event.name}</h4>
            <p>開催日時 : {getFullDate(event.date)}</p>
            <p>LTタイトル</p>
            <ul>
              {event.ltTitles.map((title, index) => {
                return <li key={index}>{title}</li>;
              })}
            </ul>
          </div>
          {/* <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true" />
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true" />
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true" />
                </span>
              </a>
            </div> */}
          {/* </nav> */}
        </div>
      </article>
    </div>
  );
};

export default box;
