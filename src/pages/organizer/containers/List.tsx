import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import Loading from '../../shared/components/Loading';
import { List as Component } from '../components/List';
import { useOrganizersEventList } from '../../../hooks/events';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { sortByDateDesc } from '../../../models/Event';

export const List: React.FC<RouteComponentProps> = () => {
  const { user } = useContext(UserContext);
  const { eventList, loading, error } = useOrganizersEventList(user.uid);
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

  return <Component eventList={sortByDateDesc(eventList)} />;
};
