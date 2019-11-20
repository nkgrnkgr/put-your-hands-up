import React from 'react';
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { NoteModel } from '../../../models/Note';
import { getAvatarUrl, UserModel } from '../../../models/User';
import { ago } from '../../../utils/datetime';
import { HeartIcon } from './HeartIcon';

interface Props {
  note: NoteModel;
  loginUser: UserModel;
  isLiked: boolean;
  hendleOnClickLikeButton: (note: NoteModel, uid: string) => void;
  handleOnClickDeletButton: (note: NoteModel) => void;
  handleOnClickCommentButton: (commentId: string) => void;
}

const useStyles = makeStyles({
  cardAction: {
    flexGrow: 1,
  },
  iconColorPink: {
    color: '#ff3860',
  },
  iconRightEnd: {
    marginLeft: 'auto',
  },
  icon: {
    fontSize: '0.9em',
  },
});

export const Note: React.FC<Props> = ({
  note,
  loginUser,
  isLiked,
  hendleOnClickLikeButton,
  handleOnClickDeletButton,
  handleOnClickCommentButton,
}) => {
  const classes = useStyles();

  const sholdShowDeleteButton = note.user.uid === loginUser.uid;

  return (
    <Card style={{ background: note.noteContents.color }}>
      <CardHeader
        avatar={
          <Tooltip title={note.user.displayName}>
            <Avatar alt={note.user.displayName} src={getAvatarUrl(note.user)} />
          </Tooltip>
        }
        title={note.user.displayName}
        subheader={ago(note.noteContents.created, 'minute') + '分前'}
      />
      <CardContent>
        <Typography color="textPrimary" component="p">
          {note.noteContents.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => hendleOnClickLikeButton(note, loginUser.uid)}
        >
          <Badge
            badgeContent={note.noteContents.fansIds.length}
            color="primary"
          >
            <HeartIcon isLiked={isLiked} />
          </Badge>
        </IconButton>
        <IconButton onClick={() => handleOnClickCommentButton(note.id)}>
          <Badge
            badgeContent={
              note.commentIds && note.commentIds.length > 0
                ? note.commentIds.length
                : 0
            }
            color="primary"
          >
            <Icon className={clsx('far fa-comment', classes.icon)} />
          </Badge>
        </IconButton>
        {sholdShowDeleteButton && (
          <IconButton
            className={classes.iconRightEnd}
            onClick={() => handleOnClickDeletButton(note)}
          >
            <Icon className={clsx('far fa-trash-alt', classes.icon)} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};