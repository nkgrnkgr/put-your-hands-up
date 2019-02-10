import Tag from 'domain/Tag';
import { actionCreatorFactory } from 'typescript-fsa';

export interface CommentActionPayload {
  comment?: string;
  tag?: Tag;
  tagIndex?: number;
  tagTitle?: string;
  shouldOpen?: boolean;
}

const actionCreater = actionCreatorFactory();

export const onChangeComment = actionCreater<CommentActionPayload>(
  'ON_CHANGE_COMMENT'
);

export const addComment = actionCreater<CommentActionPayload>('ADD_COMMENT');

export const addTag = actionCreater<CommentActionPayload>('ADD_TAG');

export const removeTag = actionCreater<CommentActionPayload>('REMOVE_TAG');

export const onChangeTagTitle = actionCreater<CommentActionPayload>(
  'ON_CHANGE_TAG_TITLE'
);

export const resetCommentInfo = actionCreater('RESET_COMMENT_INFO');

export const changeStateCommentForm = actionCreater<CommentActionPayload>(
  'CHANGE_STATE_COMMENT_FORM'
);
