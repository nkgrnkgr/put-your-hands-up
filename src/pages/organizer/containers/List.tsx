import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import Loading from '../../shared/components/Loading';
import { List as Component } from '../components/List';
import { useOrganizersEventList } from '../../../hooks/events';
import { NotificationContext } from '../../../contexts/NotificationContext';

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

  const sortedList = eventList.sort((e1, e2) => e2.date - e1.date);

  return <Component eventList={sortedList} />;
};
