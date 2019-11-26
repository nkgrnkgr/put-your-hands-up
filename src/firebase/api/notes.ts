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

export const getNote = async (noteId: string) => {
  const doc = await COLLECTION.doc(noteId).get();
  const noteData = doc.data() as NoteModel;

  return noteData;
};

export const addNote = async (note: Partial<NoteModel>) => {
  const documentRef = await COLLECTION.add(note);
  const snapshot = await documentRef.get();
  await documentRef.update({ id: snapshot.id });
};

export const addOrRemoveFansId = (note: NoteModel, uid: string) => {
  const { fansIds } = note.noteContents;

  const updatedFansIds =
    fansIds.indexOf(uid) > -1
      ? fansIds.filter(id => id !== uid)
      : [...fansIds, uid];

  const noteRef = COLLECTION.doc(note.id);
  noteRef.update({
    'noteContents.fansIds': updatedFansIds,
  });
};

export const addReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  const documentRef = await COLLECTION.doc(noteId);
  const doc = await documentRef.get();
  const note = doc.data() as NoteModel;

  if (note.commentIds && note.commentIds.length > 0) {
    documentRef.update({ commentIds: [...note.commentIds, replyCommentId] });
  } else {
    documentRef.update({ commentIds: [replyCommentId] });
  }
};

export const removeReplyCommentId = async (
  noteId: string,
  replyCommentId: string,
) => {
  const documentRef = await COLLECTION.doc(noteId);
  const doc = await documentRef.get();
  const note = doc.data() as NoteModel;

  const commentIds = note.commentIds.filter(id => id !== replyCommentId);
  documentRef.update({ commentIds });
};

export const deleteNote = (note: NoteModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const noteRef = collection.doc(note.id);
  noteRef.delete();
};
