import * as React from 'react';
import { EventMap } from 'domain/Event';

export interface ListProps {
  events: EventMap;
  auth: any;
  firestore: any;
}

const list: React.SFC<ListProps> = ({ events }) => {
  return (
    <div>
      <h2>Events</h2>
      <div>
        <pre>{JSON.stringify(events, undefined, 2)}</pre>
      </div>
    </div>
  );
};

export default list;
