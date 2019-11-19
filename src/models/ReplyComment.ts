import { UserModel } from './User';

export interface ReplyConmentModel {
  eventId: string;
  ltId: string;
  noteId: string;
  id: string;
  commentContents: CommentContensModel;
  user: UserModel;
}

export interface CommentContensModel {
  comment: string;
  createUserId: string;
  created: number;
  fansIds: string[];
}

export const sortByNewest = (replyComment: ReplyConmentModel[]) =>
  replyComment.sort(
    (a, b) => b.commentContents.created - a.commentContents.created,
  );

export const sortByOldest = (replyComment: ReplyConmentModel[]) =>
  replyComment.sort(
    (a, b) => a.commentContents.created - b.commentContents.created,
  );
