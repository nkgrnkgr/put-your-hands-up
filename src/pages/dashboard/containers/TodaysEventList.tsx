import React, { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { useTodaysEventList } from '../../../hooks/events';
import { sortByDateDesc } from '../../../models/Event';
import Loading from '../../shared/components/Loading';
import { EventList } from '../components/EventList';

export const TodaysEventList = () => {
  const { callNotification } = useContext(NotificationContext);

  const {
    eventList,
    loading: eventListLoading,
    error: eventListError,
  } = useTodaysEventList();

  if (eventListLoading) {
    return <Loading />;
  }

  if (eventListError) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <EventList eventList={sortByDateDesc(eventList)} />;
};
