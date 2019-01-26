import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from './Tabs';
import CommentsBoard from 'containers/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';

export interface EventWrapperProps {
  auth: Auth;
  firestore: Firestore;
  events: Events;
}

const eventWrapper: React.SFC<EventWrapperProps> = props => {
  const e: Event = {
    id: '',
    name: '',
    url: '',
    date: 0,
    organizerUids: {
      string: false
    },
    ltTitles: []
  };
  const event = props.events ? props.events[0] : e;
  console.log('called');
  console.log(event);
  return (
    <>
      <EventInfo event={event} />
      <Tabs {...props} event={event} />
      <CommentsBoard {...props} />
      <ConfirmModal message="本当に削除してよろしいですか？" />
      <InputForm eventurl={event.url} />
    </>
  );
};

export default eventWrapper;
