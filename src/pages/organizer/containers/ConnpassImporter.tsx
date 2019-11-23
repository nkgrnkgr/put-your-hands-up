import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { useConnpassEventData } from '../../../firebase/api/events';
import { EventModel } from '../../../models/Event';
import Loading from '../../shared/components/Loading';
import { ConnpassImporter as Component } from '../components/ConnpassImporter';

type Props = FormikProps<EventModel>;

const parse = (urlStrng: string) => {
  if (urlStrng !== '') {
    const url = new URL(urlStrng);

    return url.pathname.split('/')[2];
  }

  return '';
};

export const ConnpassImporter: React.FC<Props> = props => {
  const [eventUrl, setEventUrl] = useState<string>('');
  const [eventId, setEventId] = useState<string>('');
  const handleChange = (value: string) => setEventUrl(value);
  const { connpassEvent, loading, error } = useConnpassEventData(eventId);

  const onClickImport = () => {
    setEventId(parse(eventUrl));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }

  if (connpassEvent) {
    //   console.log(connpassEvent);
  }

  return (
    <Component handleChange={handleChange} onClickImport={onClickImport} />
  );
};
