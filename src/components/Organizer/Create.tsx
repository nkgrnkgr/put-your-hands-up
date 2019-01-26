import * as React from 'react';
import { Event } from 'domain/Event';
import { match } from 'react-router';
import InputForm from 'containers/Organizer/InputForm';

interface Params {
  id: string;
}

export interface CreateProps {
  auth: Auth;
  firestore: Firestore;
  match: match<Params>;
}

const edit: React.SFC<CreateProps> = ({ firestore, auth }) => {
  const handleCreateEvent = (event: Event) => {
    const { id, date, url, ltTitles, name } = event;
    if (firestore && firestore.set) {
      firestore.set(
        { collection: 'events', doc: id },
        {
          date,
          id,
          ltTitles,
          name,
          url,
          organizerUids: {
            [auth.uid]: true
          }
        }
      );
    }
  };

  if (event) {
    return (
      <div>
        <h1 className="title is-2">イベント作成</h1>
        <InputForm handleSubmit={event => handleCreateEvent(event as Event)} />
      </div>
    );
  }
  return <></>;
};

export default edit;
