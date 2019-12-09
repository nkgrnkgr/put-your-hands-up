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
