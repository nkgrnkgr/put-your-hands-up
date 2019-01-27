import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from 'containers/Event/Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';

export interface EventWrapperProps {
  auth: Auth;
  firestore: Firestore;
  events: Events;
  selectedTabIndex: number;
}

const eventWrapper: React.SFC<EventWrapperProps> = props => {
  const { events, selectedTabIndex } = props;
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
        <Tabs {...props} event={event} />
        {selectedTabIndex === 0 ? (
          <EventInfo event={event} />
        ) : (
          <CommentsBoard event={event} />
        )}
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <InputForm event={event} />
      </>
    );
  }
  return <Loading />;
};

export default eventWrapper;
