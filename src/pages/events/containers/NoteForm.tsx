import { Formik, FormikHelpers } from 'formik';
import React, { useContext, useState } from 'react';
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
import { tweet } from '../../../firebase/api/callFunctions';
import { TwitterIntegration } from '../../../models/Integrations';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { NotificationContext } from '../../../contexts/NotificationContext';

interface Props {
  eventId: string;
  ltId: string;
}

const createInitialValue = (uid: string) => ({
  ...defaultNoteContentsValue,
  createUserId: uid,
  created: now(),
});

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

export const NoteForm = (props: Props) => {
  const { eventId, ltId } = props;
  const { user } = useContext(UserContext);
  const { integrations } = useContext(IntegrationsContext);
  const { callNotification } = useContext(NotificationContext);

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
    if (
      sholdTwitterShare &&
      integrations.twitterIntegration &&
      v.noteContents &&
      v.noteContents.comment
    ) {
      try {
        shareWithTwitter(
          integrations.twitterIntegration,
          v.noteContents.comment,
        );
        callNotification('Tweet Successed 🎉', 'success');
      } catch (error) {
        callNotification('Tweet Faild ❌', 'error');
      }
    }
  };

  return (
    <Formik
      initialValues={createInitialValue(user.uid)}
      onSubmit={onSubmit}
      render={props => (
        <NoteListComponent
          {...props}
          user={user}
          sholdShowTwitter={integrations.twitterIntegration !== undefined}
          sholdTwitterShare={sholdTwitterShare}
          toggleTwitterShare={toggleTwitterShare}
        />
      )}
    />
  );
};
