import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import Loading from '../../shared/components/Loading';
import { List as Component } from '../components/List';
import { useOrganizersEventList } from '../../../hooks/events';

export const List: React.FC<RouteComponentProps> = () => {
  const { userValue } = useContext(UserContext);
  const { eventList, loading, error } = useOrganizersEventList(
    userValue.user.uid,
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  return <Component eventList={eventList} />;
};
