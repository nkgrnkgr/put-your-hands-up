import { ConnpassEvent } from 'connpass/lib/src/types';
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import {
  FunctionsResponse,
  searchConnpassEvent,
} from '../../../firebase/api/callFunctions';
import { EventModel } from '../../../models/Event';
import { ConnpassImporter as Component } from '../components/ConnpassImporter';

type Props = FormikProps<EventModel>;

const extractEventId = (urlStrng: string) => {
  const url = new URL(urlStrng);

  return url.pathname.split('/')[2];
};

export const ConnpassImporter: React.FC<Props> = props => {
  const { setFieldValue, values } = props;
  const [eventUrl, setEventUrl] = useState<string>('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const handleChange = (value: string) => setEventUrl(value);

  const onClickImport = async () => {
    try {
      setLoading(true);
      const response = await searchConnpassEvent({
        event_id: Number(extractEventId(eventUrl)),
      });
      const responseData = response.data as FunctionsResponse<ConnpassEvent[]>;
      const eventData = responseData.body[0];
      setFieldValue('name', `${eventData.title} ${eventData.catch}`);
      setFieldValue('hashTag', eventData.hash_tag);
      setFieldValue('date', new Date(eventData.started_at).getTime());
      setFieldValue('connppassEventUrl', eventUrl);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Component
      connppassEventUrl={values.connppassEventUrl}
      handleChange={handleChange}
      onClickImport={onClickImport}
      isLoading={isLoading}
      error={error}
    />
  );
};
