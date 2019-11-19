import { Formik, FormikHelpers } from 'formik';
import React, { useContext } from 'react';
import { NoteForm as NoteListComponent } from '../components/NoteForm';
import { UserContext } from '../../../contexts/UserContext';
import { addNote } from '../../../firebase/api/notes';
import {
  defaultNoteContentsValue,
  NoteContentsModel,
  NoteModel,
} from '../../../models/Note';
import { now } from '../../../utils/datetime';
import { onFormikSubmitHandler } from '../../../utils/formikSubmitUtils';

interface Props {
  eventId: string;
  ltId: string;
}

const createInitialValue = (uid: string) => ({
  ...defaultNoteContentsValue,
  createUserId: uid,
  created: now(),
});

export const NoteForm = (props: Props) => {
  const { eventId, ltId } = props;
  const {
    userValue: { user },
  } = useContext(UserContext);

  const onSubmit = async (
    values: NoteContentsModel,
    action: FormikHelpers<NoteContentsModel>,
  ) => {
    const submitValue: Partial<NoteModel> = {
      eventId,
      ltId,
      noteContents: values,
      user,
      commentIds: [],
    };

    const v = await onFormikSubmitHandler<
      NoteContentsModel,
      Partial<NoteModel>
    >(values, submitValue, action, 'created');
    addNote(v);
  };

  return (
    <Formik
      initialValues={createInitialValue(user.uid)}
      onSubmit={onSubmit}
      render={props => <NoteListComponent {...props} user={user} />}
    />
  );
};
