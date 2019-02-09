import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from 'containers/Event/Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';
import SearchWrapper from 'containers/Event/SearchWrapper';
import { getYearMonthDayHourMitutes } from 'utils/DateTime';
import SortTabs from 'containers/Event/SortTabs';
import CommentForm from 'containers/Event/CommentForm';

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
        <Tabs event={event} />
        <div className="container">
          <CommentForm event={event} />
          <hr />
          <h1 className="title is-4">{event.name}</h1>
          <h1 className="title is-4">
            {getYearMonthDayHourMitutes(event.date)}
          </h1>
          {selectedTabIndex === 0 ? <EventInfo event={event} /> : ''}
          <hr />
          <SearchWrapper />
          {selectedTabIndex === 0 ? (
            <h2 className="title is-3">イベント全般へのコメント</h2>
          ) : (
            ''
          )}
          <hr />
          <SortTabs />
          {query !== '' ? (
            <h5 className="title is-5">検索結果: {query}</h5>
          ) : (
            ''
          )}
          <CommentsBoard event={event} />
          <ConfirmModal message="本当に削除してよろしいですか？" />
          <InputForm event={event} />
        </div>
      </>
    );
  }
  return (
    <div className="container">
      <Loading />
    </div>
  );
};

export default eventWrapper;
