import * as React from 'react';
import { Event, Events } from 'domain/Event';
import { match } from 'react-router';
import InputForm from 'containers/Organizer/InputForm';
import { InputFormValues } from './InputForm';

interface Params {
  id: string;
}

export interface EditProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
  events: Events;
}

const edit: React.SFC<EditProps> = ({ events, firestore }) => {
  let event = undefined;
  if (events) {
    event = events[0];
  }
  const handleUpdateEvent = (updateItem: InputFormValues, event: Event) => {
    const { name, lts, date, organizerUidsKeyNames } = updateItem;
    let organizerUids = {};
    organizerUidsKeyNames.map((name, index) => {
      organizerUids = {
        ...organizerUids,
        [name]: true
      };
    });
    firestore.update(
      { collection: 'events', doc: event.id },
      {
        ...event,
        name,
        lts,
        date,
        organizerUids
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
            handleUpdateEvent(updateItem as InputFormValues, events[0])
          }
        />
      </div>
    );
  }
  return <></>;
};

export default edit;
