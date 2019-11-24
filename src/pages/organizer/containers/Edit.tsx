import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Edit as Component } from '../components/Edit';
import Loading from '../../shared/components/Loading';
import queryString, { ParsedQuery } from 'query-string';
import { useEvent } from '../../../hooks/events';

type Props = RouteComponentProps;

export const Edit: React.FC<Props> = props => {
  const params: ParsedQuery<string> = queryString.parse(props.location.search);
  const { eventId } = params;
  const id = typeof eventId === 'string' ? eventId : '';
  const { event, loading, error } = useEvent(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  return <Component event={event} />;
};
