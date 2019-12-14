import React, { useContext } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { UserContext } from '../../../contexts/UserContext';
import { addReplyComment } from '../../../firebase/api/replyComments';
import { useEventsUrl } from '../../../hooks/useEventsUrl';
import { NoteModel } from '../../../models/Note';
import {
  CommentContensModel,
  ReplyConmentModel,
} from '../../../models/ReplyComment';
import { UserModel } from '../../../models/User';
import { now } from '../../../utils/datetime';
import { onFormikSubmitHandler } from '../../../utils/formikSubmitUtils';
import { ReplyCommentForm as Component } from '../components/ReplyCommentForm';
import { NotificationContext } from '../../../contexts/NotificationContext';

interface Props {
  note: NoteModel;
}

const createInitialValues = (loginUser: UserModel): CommentContensModel => ({
  comment: '',
  createUserId: loginUser.uid,
  created: now(),
  fansIds: [],
});

export const ReplyCommentForm = (props: Props) => {
  const { note } = props;
  const { user } = useContext(UserContext);

  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );
  const { callNotification } = useContext(NotificationContext);

  const { noteId } = useEventsUrl();

  const closeReplayComments = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenReplayComments: false,
    });
  };

  const onSubmit = async (
    values: CommentContensModel,
    action: FormikHelpers<CommentContensModel>,
  ) => {
    const submitValue: Partial<ReplyConmentModel> = {
      eventId: note.eventId,
      ltId: note.ltId,
      noteId: noteId || '',
      commentContents: {
        ...values,
        created: now(),
      },
      user: user,
    };
    const v = await onFormikSubmitHandler<
      CommentContensModel,
      Partial<ReplyConmentModel>
    >(submitValue, action);

    try {
      await addReplyComment(v);
    } catch (error) {
      callNotification('ReplyComment Post Error', 'error');
    }
    closeReplayComments();
  };

  const formik = useFormik<CommentContensModel>({
    initialValues: createInitialValues(user),
    onSubmit,
  });

  const onCancel = () => {
    closeReplayComments();
  };

  return <Component {...formik} loginUser={user} onCancelClick={onCancel} />;
};
