import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Edit as Component } from '../components/Edit';
import Loading from '../../shared/components/Loading';
import queryString, { ParsedQuery } from 'query-string';
import { useEvent } from '../../../hooks/events';
import { NotificationContext } from '../../../contexts/NotificationContext';

type Props = RouteComponentProps;

export const Edit: React.FC<Props> = props => {
  const params: ParsedQuery<string> = queryString.parse(props.location.search);
  const { eventId } = params;
  const id = typeof eventId === 'string' ? eventId : '';
  const { event, loading, error } = useEvent(id);
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

  return <Component event={event} />;
};
