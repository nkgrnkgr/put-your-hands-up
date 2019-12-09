import { NoteModel } from '../../models/Note';
import { db } from '../index';

const NOTE_COLLECTION = db.collection('notes');

export const listNotesByUid = async (uid: string) => {
  const list: NoteModel[] = [];
  const snapShot = await NOTE_COLLECTION.where('user.uid', '==', uid).get();

  return new Promise(resolve => {
    snapShot.forEach(doc => {
      const data = doc.data() as NoteModel;
      const d = {
        ...data,
        id: doc.id,
      };
      list.push(d);
    });
    resolve(list);
  });
};

const REPLY_COMMENTS_COLLECTION = db.collection('replyComments');

export const listReplyCommentsByUid = async (uid: string) => {
  const list: NoteModel[] = [];
  const snapShot = await REPLY_COMMENTS_COLLECTION.where(
    'user.uid',
    '==',
    uid,
  ).get();

  return new Promise(resolve => {
    snapShot.forEach(doc => {
      const data = doc.data() as NoteModel;
      const d = {
        ...data,
        id: doc.id,
      };
      list.push(d);
    });
    resolve(list);
  });
};
