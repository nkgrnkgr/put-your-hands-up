import React from 'react';
import { EditEventForm as Component } from '../components/EditEventForm';
import { Formik } from 'formik';
import {
  createInitialEventModelValue,
  EventModel,
} from '../../../models/Event';

interface Props {
  event: EventModel | null;
}

export const EditForm: React.FC<Props> = ({ event }) => {
  return (
    <Formik
      initialValues={event || createInitialEventModelValue()}
      onSubmit={console.error}
      render={props => <Component {...props} />}
    />
  );
};
