import { useEffect, useMemo, useState } from 'react';
import { NoteModel } from '../../models/Note';
import { db } from '../index';

const COLLECTION_KEY = 'notes';
const collection = db.collection(COLLECTION_KEY);

export const useNotes = (eventId: string) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    setLoading(true);
    const collection = db.collection(COLLECTION_KEY);
    collection.where('eventId', '==', eventId).onSnapshot(qerySnapshot => {
      const t: NoteModel[] = [];
      try {
        qerySnapshot.forEach(doc => {
          const note = doc.data() as NoteModel;
          const d = {
            ...note,
            id: doc.id,
          };
          t.push(d);
        });
        setNotes(t);
      } catch (err) {
        setError(err);
      }
    });
    setLoading(false);
  }, [eventId]);

  return { notes, loading, error };
};

export const useNote = (eventId: string, ltId: string, noteId: string) => {
  const [note, setNote] = useState<NoteModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection(COLLECTION_KEY);

    const load = async () => {
      setLoading(true);
      if (noteId !== '') {
        try {
          const doc = await collection.doc(noteId).get();
          const noteData = doc.data() as NoteModel;
          if (noteData.eventId === eventId && noteData.ltId === ltId) {
            setNote({ ...noteData });
            setError(null);
          }
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      }
    };

    load();
  }, [noteId]);

  return { note, loading, error };
};

export const addNote = async (note: Partial<NoteModel>) => {
  const collection = db.collection(COLLECTION_KEY);
  try {
    const documentRef = await collection.add(note);
    const snapshot = await documentRef.get();
    await documentRef.update({ id: snapshot.id });
  } catch (err) {
    console.error(err);  // eslint-disable-line
  }
};

export const addOrRemoveFansId = (note: NoteModel, uid: string) => {
  const { fansIds } = note.noteContents;

  const updatedFansIds =
    fansIds.indexOf(uid) > -1
      ? fansIds.filter(id => id !== uid)
      : [...fansIds, uid];

  const noteRef = db.collection(COLLECTION_KEY).doc(note.id);
  try {
    noteRef.update({
      'noteContents.fansIds': updatedFansIds,
    });
  } catch (err) {
    console.error(err);  // eslint-disable-line
  }
};

export const addReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  const collection = db.collection(COLLECTION_KEY);
  try {
    const documentRef = await collection.doc(noteId);
    const doc = await documentRef.get();
    const note = doc.data() as NoteModel;

    if (note.commentIds && note.commentIds.length > 0) {
      documentRef.update({ commentIds: [...note.commentIds, replyCommentId] });
    } else {
      documentRef.update({ commentIds: [replyCommentId] });
    }
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
};

export const removeReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  try {
    const documentRef = await collection.doc(noteId);
    const doc = await documentRef.get();
    const note = doc.data() as NoteModel;

    const commentIds = note.commentIds.filter(id => id !== replyCommentId);
    documentRef.update({ commentIds });
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
};

export const deleteNote = (note: NoteModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const noteRef = collection.doc(note.id);

  try {
    noteRef.delete();
  } catch (err) {
    console.error(err); // eslint-disable-line
  }
};
