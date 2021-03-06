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
import { NotificationContext } from '../../../contexts/NotificationContext';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';

interface Props {
  event: EventModel | null;
}

export const EditForm: React.FC<Props> = ({ event }) => {
  const { user } = useContext(UserContext);
  const { callNotification } = useContext(NotificationContext);
  const { callConfirmDialog } = useContext(ConfirmDialogContext);
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
      callNotification(
        'データの更新に失敗しました。ページをリロードしてやり直してください',
        'error',
      );
    }
  };

  const handleDelete = async (values: EventModel) => {
    try {
      await deleteEvent(values);
      history.push('/organizer');
    } catch (error) {
      callNotification(
        'データの削除に失敗しました。ページをリロードしてやり直してください',
        'error',
      );
    }
  };

  const handleDeleteButton = (values: EventModel) => {
    callConfirmDialog(
      '本当にイベントを削除しますか？削除した場合、２度とアクセスすることはできません',
      () => handleDelete(values),
      () => {},
    );
  };

  return (
    <Formik
      initialValues={event || createInitialEventModelValue(user.uid)}
      onSubmit={handleSubmit}
      render={props => (
        <Component {...props} handleDelete={handleDeleteButton} />
      )}
    />
  );
};
