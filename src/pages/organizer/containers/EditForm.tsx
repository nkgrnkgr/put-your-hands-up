import React from 'react';
import { EditForm as Component } from '../components/EditForm';
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
