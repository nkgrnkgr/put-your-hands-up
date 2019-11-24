import { useMemo, useState } from 'react';
import { NoteModel } from '../models/Note';
import { getNotesSnapshot } from '../firebase/api/notes';

export const useNotes = (eventId: string) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    try {
      getNotesSnapshot(eventId, setNotes);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  return { notes, loading, error };
};
