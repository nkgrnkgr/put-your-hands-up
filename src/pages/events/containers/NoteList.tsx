import React, { useContext } from 'react';
import { EventPageContext } from '../../../contexts/EventPageContext';
import { useNotes } from '../../../firebase/api/notes';
import { filterByLt } from '../../../models/Note';
import Loading from '../../shared/components/Loading';
import { NoteList as NoteListComponent } from '../components/NoteList';

interface Props {
  eventId: string;
  ltId: string;
}

export const NoteList = (props: Props) => {
  const { eventId, ltId } = props;
  const { notes, loading, error } = useNotes(eventId);
  const { sortOrder } = useContext(EventPageContext);
  const selectedAndSortedNotes = sortOrder.function(filterByLt(notes, ltId));

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>error</>;
  }
  if (notes && notes.length > 0) {
    return <NoteListComponent notes={selectedAndSortedNotes} />;
  }

  return <></>;
};
