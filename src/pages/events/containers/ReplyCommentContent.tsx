import React, { useContext } from 'react';
import { ReplyCommentContent as Component } from '../components/ReplyCommentContent';
import { UserContext } from '../../../contexts/UserContext';
import {
  deleteReplyCommentAndRemoveFromNote,
  addOrRemoveFansId,
} from '../../../firebase/api/replyComments';
import { ReplyConmentModel } from '../../../models/ReplyComment';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';
import { NotificationContext } from '../../../contexts/NotificationContext';

interface Props {
  replyComment: ReplyConmentModel;
  noteId: string;
}

export const ReplyCommentContent = (props: Props) => {
  const { replyComment } = props;
  const { user } = useContext(UserContext);
  const { callNotification } = useContext(NotificationContext);
  const { callConfirmDialog } = useContext(ConfirmDialogContext);

  const handleOnClickLike = () => {
    try {
      addOrRemoveFansId(replyComment, user.uid);
    } catch (error) {
      callNotification(
        'データの更新に失敗しました。ページをリロードしてやり直してください',
        'error',
      );
    }
  };

  const handleDelete = () => {
    try {
      deleteReplyCommentAndRemoveFromNote(replyComment.id, props.noteId);
    } catch (error) {
      callNotification(
        'データの更新に失敗しました。ページをリロードしてやり直してください',
        'error',
      );
    }
  };

  const handleOnClickDelete = () => {
    callConfirmDialog(
      '本当に削除しますか？',
      () => handleDelete(),
      () => {},
    );
  };

  const isLiked = replyComment.commentContents.fansIds.indexOf(user.uid) > -1;

  return (
    <Component
      replyComment={replyComment}
      shouldShowDeleteButton={
        user.uid === replyComment.commentContents.createUserId
      }
      isLiked={isLiked}
      onClickLike={handleOnClickLike}
      onClickDelete={handleOnClickDelete}
    />
  );
};
