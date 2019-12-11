import { NoteModel } from '../../models/Note';
import { db } from '../index';
import { ReplyConmentModel } from '../../models/ReplyComment';
import { EventModel } from '../../models/Event';

const list = async <T>(
  uid: string,
  collection: firebase.firestore.CollectionReference,
  queryKey: string,
  assert?: boolean,
): Promise<T[]> => {
  const snapShot = await collection.where(queryKey, '==', assert || uid).get();

  return new Promise(resolve => {
    const list: T[] = [];
    snapShot.forEach(doc => {
      const data = doc.data() as T;
      const d = {
        ...data,
        id: doc.id,
      };
      list.push(d);
    });
    resolve(list);
  });
};

export const deleteNotesFandsIds = async (uid: string) => {
  const collection = db.collection('notes');
  const path = 'noteContents.fansIds';

  const snapShot = await collection.where(path, 'array-contains', uid).get();

  snapShot.forEach(async document => {
    const data = document.data() as NoteModel;
    const { fansIds } = data.noteContents;
    const extractedIds = fansIds.filter(id => id !== uid);
    const ref = collection.doc(data.id);
    await ref.update({
      [path]: extractedIds,
    });
  });
};

export const deleteReplyCommentFanIds = async (uid: string) => {
  const collection = db.collection('replyComments');
  const path = 'commentContents.fansIds';

  const snapShot = await collection.where(path, 'array-contains', uid).get();

  snapShot.forEach(async document => {
    const data = document.data() as ReplyConmentModel;
    const { fansIds } = data.commentContents;
    const extractedIds = fansIds.filter(id => id !== uid);
    const ref = collection.doc(data.id);
    await ref.update({
      [path]: extractedIds,
    });
  });
};

export const deleteNotes = async (uid: string) => {
  const snapShot = await db
    .collection('notes')
    .where('user.uid', '==', uid)
    .get();

  snapShot.forEach(async document => {
    const doc = db.collection('notes').doc(document.id);
    await doc.delete();
  });
};

export const listNotesByUid = async (uid: string) => {
  return list<NoteModel>(uid, db.collection('notes'), `user.uid`);
};

export const listReplyCommentsByUid = async (uid: string) => {
  return list<ReplyConmentModel>(
    uid,
    db.collection('replyComments'),
    `user.uid`,
  );
};

export const listEventsByUid = async (uid: string) => {
  return list<EventModel>(
    uid,
    db.collection('events'),
    `organizerUids.${uid}`,
    true,
  );
};
