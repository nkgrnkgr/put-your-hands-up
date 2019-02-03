import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from 'containers/Event/Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';
import SearchWrapper from 'containers/Event/SearchWrapper';

export interface EventWrapperProps {
  auth: Auth;
  firestore: Firestore;
  events: Events;
  selectedTabIndex: number;
  query: string;
}

const eventWrapper: React.SFC<EventWrapperProps> = props => {
  const { events, selectedTabIndex, query } = props;
  const e: Event = {
    id: '',
    name: '',
    url: '',
    date: 0,
    organizerUids: {
      string: false
    },
    lts: []
  };
  const event: Event = events ? events[0] : e;

  if (events) {
    return (
      <>
        <Tabs {...props} event={event} />
        <SearchWrapper />
        <hr />
        {selectedTabIndex === 0 ? <EventInfo event={event} /> : ''}
        {selectedTabIndex === 0 ? (
          <h2 className="title is-3">イベント全般へのコメント</h2>
        ) : (
          ''
        )}
        {query !== '' ? <h5 className="title is-5">検索結果: {query}</h5> : ''}
        <hr />
        <CommentsBoard event={event} />
        <ConfirmModal message="本当に削除してよろしいですか？" />
        <InputForm event={event} />
      </>
    );
  }
  return <Loading />;
};

export default eventWrapper;
