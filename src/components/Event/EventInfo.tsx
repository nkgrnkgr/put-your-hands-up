import * as React from 'react';
import { Event } from 'domain/Event';
import { getFullDate } from 'utils/DateTime';
import Box from 'containers/Event/Box';
export interface EventInfoProps {
  event: Event;
}

const eventInfo: React.SFC<EventInfoProps> = ({ event }) => {
  const { lts } = event;
  if (lts && lts.length > 0) {
    return (
      <article className="message">
        <div className="message-header">
          <p>{`${event.name} - ${getFullDate(event.date)}`}</p>
        </div>
        <div className="message-body">
          {lts.map((lt, index) => {
            return <Box key={index} lt={lt} index={index} />;
          })}
        </div>
      </article>
    );
  }
  return <div />;
};

export default eventInfo;
