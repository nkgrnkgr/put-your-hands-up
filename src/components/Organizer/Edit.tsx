import * as React from 'react';
import { Event, EventMap } from 'domain/Event';
import { match } from 'react-router';
import InputForm from 'containers/Organizer/InputForm';

interface Params {
  id: string;
}

export interface EditProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
  events: EventMap;
}

const edit: React.SFC<EditProps> = ({ events, firestore }) => {
  let event = undefined;
  if (events) {
    event = events[0];
  }
  const handleUpdateEvent = (updateItem: Event, event: Event) => {
    const { name, ltTitles, date } = updateItem;
    firestore.update(
      { collection: 'events', doc: event.id },
      {
        ...event,
        name,
        ltTitles,
        date
      }
    );
  };

  if (event) {
    return (
      <div>
        <h1 className="title is-2">イベント編集</h1>
        <InputForm
          event={event}
          handleSubmit={updateItem =>
            handleUpdateEvent(updateItem as Event, events[0])
          }
        />
        <div>
          <pre>{JSON.stringify(events, undefined, 2)}</pre>
        </div>
      </div>
    );
  }
  return <></>;
};

export default edit;
