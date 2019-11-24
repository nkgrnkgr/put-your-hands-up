import { Formik } from 'formik';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../../contexts/UserContext';
import {
  addEvent,
  deleteEvent,
  updateEvent,
} from '../../../firebase/api/events';
import {
  createInitialEventModelValue,
  EventModel,
} from '../../../models/Event';
import { EditEventForm as Component } from '../components/EditEventForm';

interface Props {
  event: EventModel | null;
}

export const EditForm: React.FC<Props> = ({ event }) => {
  const { userValue } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (values: EventModel) => {
    try {
      if (values.id === '') {
        await addEvent(values);
      } else {
        await updateEvent(values);
      }
      history.push('/organizer');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (values: EventModel) => {
    try {
      await deleteEvent(values);
      history.push('/organizer');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={event || createInitialEventModelValue(userValue.user.uid)}
      onSubmit={handleSubmit}
      render={props => <Component {...props} handleDelete={handleDelete} />}
    />
  );
};
