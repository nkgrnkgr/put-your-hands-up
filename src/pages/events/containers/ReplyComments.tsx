import React, { useContext } from 'react';
import { useEventsUrl } from '../../../hooks/useEventsUrl';
import Loading from '../../shared/components/Loading';
import { ReplyComments as Component } from '../components/ReplyComments';
import { sortByOldest } from '../../../models/ReplyComment';
import { useNote } from '../../../hooks/notes';
import { useReplyCommentsSnapshot } from '../../../hooks/replyComments';
import { NotificationContext } from '../../../contexts/NotificationContext';

export const ReplyComments = () => {
  const { eventId, ltId, noteId } = useEventsUrl();
  const { note, loading: noteLoading, error: noteError } = useNote(
    eventId || '',
    ltId || '',
    noteId || '',
  );
  const {
    replyComments,
    loading: replyCommentsLoading,
    error: replyCommentsError,
  } = useReplyCommentsSnapshot(noteId || '');
  const { callNotification } = useContext(NotificationContext);

  if (!noteId || !note) {
    return <></>;
  }

  if (noteLoading || replyCommentsLoading) {
    return <Loading />;
  }

  if (noteError || replyCommentsError) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <Component note={note} replyComments={sortByOldest(replyComments)} />;
};
