import { ReplyConmentModel } from '../../models/ReplyComment';
import { db } from '../index';
import { addReplyCommentId, removeReplyCommentId } from './notes';

const COLLECTION_KEY = 'replyComments';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getReplyCommentsSnapshot = (
  noteId: string,
  callback: Function,
) => {
  COLLECTION.where('noteId', '==', noteId).onSnapshot(qerySnapshot => {
    const list: ReplyConmentModel[] = [];
    qerySnapshot.forEach(doc => {
      const data = doc.data() as ReplyConmentModel;
      list.push({ ...data, id: doc.id });
    });
    callback(list);
  });
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

  const noteRef = COLLECTION.doc(replyComment.id);
  noteRef.update({
    'commentContents.fansIds': updatedFansIds,
  });
};

export const addReplyComment = async (
  replyComment: Partial<ReplyConmentModel>,
) => {
  const documentRef = await COLLECTION.add(replyComment);
  const snapshot = await documentRef.get();
  await documentRef.update({ id: snapshot.id });
  addReplyCommentId(replyComment.noteId || '', snapshot.id);
};

export const deleteReplyCommentAndRemoveFromNote = async (
  replyCommentId: string,
  noteId: string,
) => {
  const replyCommentRef = COLLECTION.doc(replyCommentId);
  await replyCommentRef.delete();
  removeReplyCommentId(noteId, replyCommentId);
};
