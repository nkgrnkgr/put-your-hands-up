import React from 'react';
import { NoteModel } from '../../../models/Note';
import { ReplyConmentModel } from '../../../models/ReplyComment';

import { ReplyCommentForm } from '../containers/ReplyCommentForm';
import { ReplyCommentContent } from '../containers/ReplyCommentContent';
import { ReplyCommentNoteContent } from './ReplyCommentNoteContent';

interface Props {
  note: NoteModel;
  replyComments: ReplyConmentModel[];
}

export const ReplyComments: React.FC<Props> = ({ note, replyComments }) => (
  <>
    <ReplyCommentNoteContent
      displayName={note.user.displayName}
      avatarUrl={note.user.avatarUrl}
      created={note.noteContents.created}
      comment={note.noteContents.comment}
    />
    <>
      {replyComments &&
        replyComments.map(replyComment => (
          <ReplyCommentContent
            key={replyComment.id}
            replyComment={replyComment}
            noteId={note.id}
          />
        ))}
    </>
    <ReplyCommentForm note={note} />
  </>
);
