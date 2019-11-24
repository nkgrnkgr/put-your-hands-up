import React from 'react';
import { useEventsUrl } from '../../../hooks/useEventsUrl';
import Loading from '../../shared/components/Loading';
import { ReplyComments as Component } from '../components/ReplyComments';
import { sortByOldest } from '../../../models/ReplyComment';
import { useNote } from '../../../hooks/notes';
import { useReplyCommentsSnapshot } from '../../../hooks/replyComments';

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

  if (!noteId || !note) {
    return <></>;
  }

  if (noteLoading || replyCommentsLoading) {
    return <Loading />;
  }

  if (noteError || replyCommentsError) {
    console.error(noteError);
    console.error(replyCommentsError);
  }

  return <Component note={note} replyComments={sortByOldest(replyComments)} />;
};
