import React, { useContext, useEffect } from 'react';
import { EditEventForm as Component } from '../components/EditEventForm';
import { Formik } from 'formik';
import {
  createInitialEventModelValue,
  EventModel,
} from '../../../models/Event';
import {
  addEvent,
  updateEvent,
  deleteEvent,
} from '../../../firebase/api/events';
import { UserContext } from '../../../contexts/UserContext';
import { useHistory } from 'react-router';
import {
  searchConnpassEvent,
  FunctionsResponse,
} from '../../../firebase/api/callFunctions';
import { ConnpassEvent } from 'connpass/lib/src/types';

interface Props {
  event: EventModel | null;
}

export const EditForm: React.FC<Props> = ({ event }) => {
  const { userValue } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (values: EventModel) => {
    if (values.id === '') {
      addEvent(values);
    } else {
      updateEvent(values);
    }
    history.push('/organizer');
  };

  const handleDelete = (values: EventModel) => {
    deleteEvent(values);
    history.push('/organizer');
  };

  return (
    <Formik
      initialValues={event || createInitialEventModelValue(userValue.user.uid)}
      onSubmit={handleSubmit}
      render={props => <Component {...props} handleDelete={handleDelete} />}
    />
  );
};
