import * as React from 'react';
import { EventMap } from 'domain/Event';
import { match } from 'react-router';
import InputForm from 'containers/Organizer/InputForm';

interface Params {
  id: string;
}

export interface EditProps {
  auth: any;
  firestore: any;
  match: match<Params>;
  events: EventMap;
}

const edit: React.SFC<EditProps> = ({ events }) => {
  let event = undefined;
  if (events) {
    event = events[0];
  }
  if (event) {
    return (
      <div>
        <h2>Edit</h2>
        <div>
          <pre>{JSON.stringify(events, undefined, 2)}</pre>
        </div>
        <InputForm event={event} />
      </div>
    );
  }
  return <></>;
};

export default edit;
