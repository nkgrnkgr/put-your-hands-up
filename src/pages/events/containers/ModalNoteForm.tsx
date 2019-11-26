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
import { tweet } from '../../../firebase/api/callFunctions';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { TwitterIntegration } from '../../../models/Integrations';

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
  const { user } = useContext(UserContext);
  const { integrations } = useContext(IntegrationsContext);

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

  const shareWithTwitter = (
    twitterIntegration: TwitterIntegration,
    status: string,
  ) => {
    tweet({
      oauth_token: twitterIntegration.accessToken,
      oauth_token_secret: twitterIntegration.accessTokenSecret,
      status,
    });
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
    if (
      sholdTwitterShare &&
      integrations &&
      integrations.twitterIntegration &&
      v.noteContents &&
      v.noteContents.comment
    ) {
      shareWithTwitter(integrations.twitterIntegration, v.noteContents.comment);
    }
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
          sholdShowTwitter={integrations.twitterIntegration !== undefined}
          sholdTwitterShare={sholdTwitterShare}
          toggleTwitterShare={toggleTwitterShare}
        />
      )}
    />
  );
};
