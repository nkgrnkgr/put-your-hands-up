import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { ago } from '../../../utils/datetime';
import { CommentContent } from './CommentContent';

interface Props {
  displayName: string;
  avatarUrl: string;
  created: number;
  comment: string;
}

export const ReplyCommentNoteContent: React.FC<Props> = ({
  displayName,
  avatarUrl,
  created,
  comment,
}) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={displayName} src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={displayName}
          secondary={
            <>
              {`${ago(created, 'minute')}分前`}
              <br />
              <CommentContent comment={comment} />
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};
