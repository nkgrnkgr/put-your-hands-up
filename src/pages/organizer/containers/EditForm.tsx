import React, { useContext } from 'react';
import { EditEventForm as Component } from '../components/EditEventForm';
import { Formik } from 'formik';
import {
  createInitialEventModelValue,
  EventModel,
} from '../../../models/Event';
import { addEvent, updateEvent } from '../../../firebase/api/events';
import { UserContext } from '../../../contexts/UserContext';

interface Props {
  event: EventModel | null;
}

const handleSubmit = (values: EventModel) => {
  if (values.id === '') {
    return addEvent(values);
  }

  return updateEvent(values);
};

export const EditForm: React.FC<Props> = ({ event }) => {
  const { userValue } = useContext(UserContext);

  return (
    <Formik
      initialValues={event || createInitialEventModelValue(userValue.user.uid)}
      onSubmit={handleSubmit}
      render={props => <Component {...props} />}
    />
  );
};
