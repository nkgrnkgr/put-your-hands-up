import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from 'containers/Event/Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';
import { getYearMonthDayHourMitutes } from 'utils/DateTime';
import SortTabs from 'containers/Event/SortTabs';
import CommentForm from 'containers/Event/CommentForm';
import SearchResults from 'containers/Event/SearchResults';
import Navbar from 'containers/Navbar';
import UserList from 'containers/Event/UserList';

export interface EventWrapperProps {
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
    lts: []
  };
  const event: Event = events ? events[0] : e;

  if (events) {
    return (
      <>
        <Navbar event={event} />
        <Tabs event={event} />
        <section className="section" style={{ paddingTop: '0px' }}>
          <div className="container">
            <h1 className="title is-4">
              {event.name} - {getYearMonthDayHourMitutes(event.date)}
            </h1>
            <UserList event={event} />
            {selectedTabIndex === 0 ? <EventInfo event={event} /> : ''}
            <hr />
            <CommentForm event={event} />
            {selectedTabIndex === 0 ? (
              <h2 className="title is-3">イベント全般へのコメント</h2>
            ) : (
              ''
            )}
            <hr />
            <SearchResults />
            <hr />
            <SortTabs />
            <CommentsBoard event={event} />
            <ConfirmModal message="本当に削除してよろしいですか？" />
            <InputForm event={event} />
          </div>
        </section>
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
