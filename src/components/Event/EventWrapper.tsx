import * as React from 'react';
import { Event, Events } from 'domain/Event';
import EventInfo from 'components/Event/EventInfo';
import Tabs from 'containers/Event/Tabs';
import CommentsBoard from 'containers/Event/CommentsBoard';
import ConfirmModal from 'containers/ConfirmModal';
import Loading from 'components/Loading';
import { getYearMonthDayHourMitutes } from 'utils/DateTime';
import SortTabs from 'containers/Event/SortTabs';
import CommentForm from 'containers/Event/CommentForm';
import SearchResults from 'containers/Event/SearchResults';
import Navbar from 'containers/Navbar';
import UserList from 'containers/Event/UserList';
import AuthWrapper from 'containers/AuthWrapper';
import CommentFormModal from 'containers/Event/CommentFormModal';

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
            <AuthWrapper>
              <div className="columns is-centered is-hidden-touch">
                <div className="column is-two-thirds-desktop">
                  <div className="card">
                    <div className="box" style={{ padding: '1em' }}>
                      <CommentForm event={event} />
                    </div>
                  </div>
                </div>
              </div>
            </AuthWrapper>
            <AuthWrapper>
              <CommentFormModal event={event} />
            </AuthWrapper>
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
          </div>
        </section>
      </>
    );
  }
  return (
    <section className="section">
      <div className="container">
        <Loading />
      </div>
    </section>
  );
};

export default eventWrapper;
