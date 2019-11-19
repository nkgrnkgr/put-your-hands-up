import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useEvent } from '../../../firebase/api/events';
import Loading from '../../shared/components/Loading';
import { Eventpage as Component } from '../components/EventPage';

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
  const { event, loading, error } = useEvent(eventId);

  if (!event) {
    return <></>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  return <Component event={event} />;
};
