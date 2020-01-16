import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import Loading from '../../shared/components/Loading';
import { Eventpage as Component } from '../components/EventPage';
import { useEventSnapshot } from '../../../hooks/events';
import { NotificationContext } from '../../../contexts/NotificationContext';

type Params = {
  eventId: string;
};

type Props = RouteComponentProps<Params>;

export const Eventpage = (props: Props) => {
  const {
    match: {
      params: { eventId },
    },
  } = props;
  const { event, loading, error } = useEventSnapshot(eventId);
  const { callNotification } = useContext(NotificationContext);

  if (!event) {
    return <></>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <Component event={event} />;
};
