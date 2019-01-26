import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from './Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';

export interface EventWrapperProps {
  auth: Auth;
  firestore: Firestore;
  events: Events;
}

const eventWrapper: React.SFC<EventWrapperProps> = ({ events }) => {
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
  const event: Event = events ? events[0] : e;

  if (events) {
    return (
      <>
        <EventInfo event={event} />
        <Tabs event={event} />
        <CommentsBoard event={event} />
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <InputForm event={event} />
      </>
    );
  }
  return <Loading />;
};

export default eventWrapper;
