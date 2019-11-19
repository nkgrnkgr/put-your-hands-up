import React, { useContext } from 'react';
import { ReplyCommentContent as Component } from '../components/ReplyCommentContent';
import { UserContext } from '../../../contexts/UserContext';
import {
  deleteReplyCommentAndRemoveFromNote,
  addOrRemoveFansId,
} from '../../../firebase/api/replyComments';
import { ReplyConmentModel } from '../../../models/ReplyComment';

interface Props {
  replyComment: ReplyConmentModel;
  noteId: string;
}

export const ReplyCommentContent = (props: Props) => {
  const { replyComment } = props;
  const { userValue } = useContext(UserContext);

  const handleOnClickLike = () => {
    addOrRemoveFansId(replyComment, userValue.user.uid);
  };

  const handleOnClickDelete = () => {
    deleteReplyCommentAndRemoveFromNote(replyComment.id, props.noteId);
  };

  const isLiked =
    replyComment.commentContents.fansIds.indexOf(userValue.user.uid) > -1;

  return (
    <Component
      replyComment={replyComment}
      shouldShowDeleteButton={
        userValue.user.uid === replyComment.commentContents.createUserId
      }
      isLiked={isLiked}
      onClickLike={handleOnClickLike}
      onClickDelete={handleOnClickDelete}
    />
  );
};
