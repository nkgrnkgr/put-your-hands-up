import React from 'react';
import { ParticipatedUsers as Component } from '../components/ParticipatedUsers';
import { EventModel } from '../../../models/Event';
import Loading from '../../shared/components/Loading';
import { useParticipatedUsers } from '../../../hooks/users';

interface Props {
  event: EventModel;
}

export const ParticipatedUsers = (props: Props) => {
  const { event } = props;
  const { users, loading, error } = useParticipatedUsers(event.id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  return <Component users={users} />;
};
