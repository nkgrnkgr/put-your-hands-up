import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { UserContext } from '../../../contexts/UserContext';
import { addOrRemoveFansId, deleteNote } from '../../../firebase/api/notes';
import { NoteModel } from '../../../models/Note';
import { Note as NoteComponent } from '../components/Note';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';
import { EventPageContext } from '../../../contexts/EventPageContext';

interface Props {
  note: NoteModel;
}

export const Note = (props: Props) => {
  const { note } = props;
  const { user } = useContext(UserContext);

  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const { setTag } = useContext(EventPageContext);
  const handleOnClickTag = (tagTitle: string) => setTag(tagTitle);

  const { callConfirmDialog } = useContext(ConfirmDialogContext);
  const handleOnCLickDeleteButton = (note: NoteModel) => {
    callConfirmDialog(
      '本当に削除しますか？',
      () => deleteNote(note),
      () => {},
    );
  };

  const history = useHistory();
  const openReplyComments = (noteId: string) => {
    setApplicationValues({
      ...applicationValues,
      isOpenReplayComments: true,
    });

    history.push(`/events/${note.eventId}/?ltId=${note.ltId}&noteId=${noteId}`);
  };

  const isLiked = note.noteContents.fansIds.indexOf(user.uid) > -1;

  return (
    <NoteComponent
      note={note}
      loginUser={user}
      isLiked={isLiked}
      hendleOnClickLikeButton={addOrRemoveFansId}
      handleOnClickDeleteButton={handleOnCLickDeleteButton}
      handleOnClickCommentButton={openReplyComments}
      handleOnClickTag={handleOnClickTag}
    />
  );
};
