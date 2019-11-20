import React from 'react';
import { ParticipatedUsers as Component } from '../components/ParticipatedUsers';
import { useParticipatedUsers } from '../../../firebase/api/users';
import { EventModel } from '../../../models/Event';
import Loading from '../../shared/components/Loading';

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