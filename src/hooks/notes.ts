import { useMemo, useState, useEffect } from 'react';
import { NoteModel } from '../models/Note';
import { getNotesSnapshot, getNote } from '../firebase/api/notes';

export const useNotesSnapshot = (eventId: string) => {
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

export const useNote = (eventId: string, ltId: string, noteId: string) => {
  const [note, setNote] = useState<NoteModel>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      if (noteId !== '') {
        try {
          const note = await getNote(noteId);
          if (note.eventId === eventId && note.ltId === ltId) {
            setNote(note);
            setError(null);
          }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    run();
    // eslint-disable-next-line
  }, [noteId]);

  return { note, loading, error };
};
