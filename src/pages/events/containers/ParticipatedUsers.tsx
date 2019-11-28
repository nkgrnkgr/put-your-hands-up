import React, { useContext } from 'react';
import { ParticipatedUsers as Component } from '../components/ParticipatedUsers';
import { EventModel } from '../../../models/Event';
import Loading from '../../shared/components/Loading';
import { useParticipatedUsers } from '../../../hooks/users';
import { NotificationContext } from '../../../contexts/NotificationContext';

interface Props {
  event: EventModel;
}

export const ParticipatedUsers = (props: Props) => {
  const { event } = props;
  const { users, loading, error } = useParticipatedUsers(event.id);
  const { callNotification } = useContext(NotificationContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <Component users={users} />;
};
