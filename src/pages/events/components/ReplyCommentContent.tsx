import {
  Avatar,
  Badge,
  createStyles,
  Divider,
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { ReplyConmentModel } from '../../../models/ReplyComment';
import { ago } from '../../../utils/datetime';
import { CommentContent } from './CommentContent';
import { HeartIcon } from './HeartIcon';

interface Props {
  replyComment: ReplyConmentModel;
  shouldShowDeleteButton: boolean;
  isLiked: boolean;
  onClickLike: () => void;
  onClickDelete: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
    reply: {
      paddingLeft: theme.spacing(5),
    },
    iconButton: {
      marginRight: theme.spacing(0.5),
    },
    icon: {
      fontSize: '0.9em',
    },
  }),
);

export const ReplyCommentContent: React.FC<Props> = ({
  replyComment,
  shouldShowDeleteButton,
  isLiked,
  onClickLike,
  onClickDelete,
}) => {
  const classes = useStyles();
  const { user, commentContents } = replyComment;

  return (
    <>
      <ListItem alignItems="flex-start" className={classes.reply}>
        <ListItemAvatar>
          <Avatar alt={user.displayName} src={user.avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={user.displayName}
          secondary={
            <>
              {`${ago(commentContents.created, 'minute')}分前`}
              <br />
              <CommentContent comment={commentContents.comment} />
            </>
          }
        />
      </ListItem>
      <div className={classes.reply}>
        <IconButton
          className={classes.iconButton}
          onClick={() => onClickLike()}
        >
          <Badge badgeContent={commentContents.fansIds.length} color="primary">
            <HeartIcon isLiked={isLiked} />
          </Badge>
        </IconButton>
        {shouldShowDeleteButton && (
          <IconButton
            className={classes.iconButton}
            onClick={() => onClickDelete()}
          >
            <Icon className={clsx('far fa-trash-alt', classes.icon)} />
          </IconButton>
        )}
      </div>
      <Divider />
    </>
  );
};
