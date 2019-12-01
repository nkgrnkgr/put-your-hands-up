import { Formik, FormikHelpers } from 'formik';
import React, { useContext, useState } from 'react';
import { NoteForm as Component } from '../components/NoteForm';
import { ModalNoteForm as ModalComponent } from '../components/ModalNoteForm';
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
import { TwitterIntegration } from '../../../models/Integrations';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface Props {
  eventId: string;
  ltId: string;
  hashTag: string;
}

const createInitialValue = (uid: string) => ({
  ...defaultNoteContentsValue,
  createUserId: uid,
  created: now(),
});

const addtHashTagToComment = (comment: string, hashTag: string) => {
  if (hashTag && hashTag !== '') {
    return `${comment}\n\n#${hashTag}`;
  }

  return comment;
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

export const NoteForm = (props: Props) => {
  const { eventId, ltId, hashTag } = props;
  const { user } = useContext(UserContext);
  const { integrations } = useContext(IntegrationsContext);
  const { callNotification } = useContext(NotificationContext);

  const theme = useTheme();
  const isTabletOrPCLayout = useMediaQuery(theme.breakpoints.up('sm'));
  const isSmartPhoneLayout = useMediaQuery(theme.breakpoints.down('xs'));

  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const closeNoteForm = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenNoteForm: false,
    });
  };

  const openNoteForm = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenNoteForm: true,
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
    if (
      sholdTwitterShare &&
      integrations.twitterIntegration &&
      v.noteContents &&
      v.noteContents.comment
    ) {
      try {
        shareWithTwitter(
          integrations.twitterIntegration,
          addtHashTagToComment(v.noteContents.comment, hashTag),
        );
        callNotification('Tweet Successed 🎉', 'success');
      } catch (error) {
        callNotification('Tweet Faild ❌', 'error');
      }
    }
    closeNoteForm();
  };

  return (
    <Formik
      initialValues={createInitialValue(user.uid)}
      onSubmit={onSubmit}
      render={props => {
        if (isSmartPhoneLayout) {
          return (
            <ModalComponent
              {...props}
              user={user}
              open={applicationValues.isOpenNoteForm}
              onClose={closeNoteForm}
              sholdShowTwitter={integrations.twitterIntegration !== undefined}
              sholdTwitterShare={sholdTwitterShare}
              toggleTwitterShare={toggleTwitterShare}
            />
          );
        }

        if (isTabletOrPCLayout) {
          return (
            <Component
              {...props}
              user={user}
              open={applicationValues.isOpenNoteForm}
              onOpen={openNoteForm}
              onClose={closeNoteForm}
              sholdShowTwitter={integrations.twitterIntegration !== undefined}
              sholdTwitterShare={sholdTwitterShare}
              toggleTwitterShare={toggleTwitterShare}
            />
          );
        }

        return <></>;
      }}
    />
  );
};
