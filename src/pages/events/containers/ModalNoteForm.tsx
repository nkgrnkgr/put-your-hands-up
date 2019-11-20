import { Formik, FormikHelpers } from 'formik';
import React, { useContext, useState } from 'react';
import { ModalNoteForm as Component } from '../components/ModalNoteForm';
import { UserContext } from '../../../contexts/UserContext';
import { addNote } from '../../../firebase/api/notes';
import {
  defaultNoteContentsValue,
  NoteContentsModel,
  NoteModel,
} from '../../../models/Note';
import { now } from '../../../utils/datetime';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
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

export const ModalNoteForm = (props: Props) => {
  const { eventId, ltId } = props;
  const {
    userValue: { user },
  } = useContext(UserContext);
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const onClickCloseButton = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenModal: false,
    });
  };

  const [sholdTwitterShare, setTwitterShare] = useState(false);
  const toggleTwitterShare = () => {
    setTwitterShare(!sholdTwitterShare);
  };

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
    onClickCloseButton();
  };

  return (
    <Formik
      initialValues={createInitialValue(user.uid)}
      onSubmit={onSubmit}
      render={props => (
        <Component
          {...props}
          user={user}
          open={applicationValues.isOpenModal}
          onClose={onClickCloseButton}
          sholdTwitterShare={sholdTwitterShare}
          toggleTwitterShare={toggleTwitterShare}
        />
      )}
    />
  );
};
