import React, { useContext } from 'react';
import { EventPageContext } from '../../../contexts/EventPageContext';
import { filterByLt, filterByTags } from '../../../models/Note';
import Loading from '../../shared/components/Loading';
import { NoteList as NoteListComponent } from '../components/NoteList';
import { useNotesSnapshot } from '../../../hooks/notes';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { EmptyContents } from '../../shared/containers/EmptyContents';

interface Props {
  eventId: string;
  ltId: string;
}

export const NoteList = (props: Props) => {
  const { eventId, ltId } = props;
  const { notes, loading, error } = useNotesSnapshot(eventId);
  const { sortOrder, selectedTags } = useContext(EventPageContext);
  const sortedAndNotesByLt = sortOrder.function(filterByLt(notes, ltId));
  const notesHasSelectedTags = filterByTags(sortedAndNotesByLt, selectedTags);
  const { callNotification } = useContext(NotificationContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }
  if (notes && notes.length > 0) {
    return (
      <NoteListComponent
        notes={
          notesHasSelectedTags.length > 0
            ? notesHasSelectedTags
            : sortedAndNotesByLt
        }
      />
    );
  }

  return <EmptyContents message="まだ投稿がありません👍" />;
};
