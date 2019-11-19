import { useMemo, useState } from 'react';
import { ReplyConmentModel } from '../../models/ReplyComment';
import { db } from '../index';
import { addReplyCommentId, removeReplyCommentId } from './notes';

const COLLECTION_KEY = 'replyComments';

export const useReplyComments = (noteId: string) => {
  const [replyComments, setReplyComments] = useState<ReplyConmentModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    setLoading(true);
    const collection = db.collection(COLLECTION_KEY);
    collection.where('noteId', '==', noteId).onSnapshot(qerySnapshot => {
      const list: ReplyConmentModel[] = [];
      try {
        qerySnapshot.forEach(doc => {
          const data = doc.data() as ReplyConmentModel;
          list.push({ ...data, id: doc.id });
        });
        setReplyComments(list);
        setError(null);
      } catch (err) {
        setError(err);
      }
    });
    setLoading(false);
  }, [noteId]);

  return { replyComments, loading, error };
};

export const addOrRemoveFansId = (
  replyComment: ReplyConmentModel,
  uid: string,
) => {
  const { fansIds } = replyComment.commentContents;

  const updatedFansIds =
    fansIds.indexOf(uid) > -1
      ? fansIds.filter(id => id !== uid)
      : [...fansIds, uid];

  const noteRef = db.collection(COLLECTION_KEY).doc(replyComment.id);
  try {
    noteRef.update({
      'commentContents.fansIds': updatedFansIds,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addReplyComment = async (
  replyComment: Partial<ReplyConmentModel>,
) => {
  const collection = db.collection(COLLECTION_KEY);
  try {
    const documentRef = await collection.add(replyComment);
    const snapshot = await documentRef.get();
    await documentRef.update({ id: snapshot.id });
    addReplyCommentId(replyComment.noteId || '', snapshot.id);
  } catch (err) {
    console.error(err);
  }
};

export const deleteReplyCommentAndRemoveFromNote = async (
  replyCommentId: string,
  noteId: string,
) => {
  const collection = db.collection(COLLECTION_KEY);
  const replyCommentRef = collection.doc(replyCommentId);
  try {
    await replyCommentRef.delete();
    removeReplyCommentId(noteId, replyCommentId);
  } catch (err) {
    console.error(err);
  }
};
