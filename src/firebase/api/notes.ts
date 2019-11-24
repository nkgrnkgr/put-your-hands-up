import { useEffect, useState } from 'react';
import { NoteModel } from '../../models/Note';
import { db } from '../index';

const COLLECTION_KEY = 'notes';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getNotesSnapshot = (eventId: string, callback: Function) => {
  COLLECTION.where('eventId', '==', eventId).onSnapshot(qerySnapshot => {
    const t: NoteModel[] = [];
    qerySnapshot.forEach(doc => {
      const note = doc.data() as NoteModel;
      const d = {
        ...note,
        id: doc.id,
      };
      t.push(d);
    });
    callback(t);
  });
};

export const useNote = (eventId: string, ltId: string, noteId: string) => {
  const [note, setNote] = useState<NoteModel>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (noteId !== '') {
        try {
          const doc = await COLLECTION.doc(noteId).get();
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
  try {
    const documentRef = await COLLECTION.add(note);
    const snapshot = await documentRef.get();
    await documentRef.update({ id: snapshot.id });
  } catch (err) {
    console.error(err);
  }
};

export const addOrRemoveFansId = (note: NoteModel, uid: string) => {
  const { fansIds } = note.noteContents;

  const updatedFansIds =
    fansIds.indexOf(uid) > -1
      ? fansIds.filter(id => id !== uid)
      : [...fansIds, uid];

  const noteRef = COLLECTION.doc(note.id);
  try {
    noteRef.update({
      'noteContents.fansIds': updatedFansIds,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  try {
    const documentRef = await COLLECTION.doc(noteId);
    const doc = await documentRef.get();
    const note = doc.data() as NoteModel;

    if (note.commentIds && note.commentIds.length > 0) {
      documentRef.update({ commentIds: [...note.commentIds, replyCommentId] });
    } else {
      documentRef.update({ commentIds: [replyCommentId] });
    }
  } catch (err) {
    console.error(err);
  }
};

export const removeReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  try {
    const documentRef = await COLLECTION.doc(noteId);
    const doc = await documentRef.get();
    const note = doc.data() as NoteModel;

    const commentIds = note.commentIds.filter(id => id !== replyCommentId);
    documentRef.update({ commentIds });
  } catch (err) {
    console.error(err);
  }
};

export const deleteNote = (note: NoteModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const noteRef = collection.doc(note.id);

  try {
    noteRef.delete();
  } catch (err) {
    console.error(err);
  }
};
