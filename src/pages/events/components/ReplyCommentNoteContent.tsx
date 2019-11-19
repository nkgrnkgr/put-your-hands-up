import {
  Avatar,
  createStyles,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { ago } from '../../../utils/datetime';

interface Props {
  displayName: string;
  avatarUrl: string;
  created: number;
  comment: string;
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

export const ReplyCommentNoteContent: React.FC<Props> = ({
  displayName,
  avatarUrl,
  created,
  comment,
}) => {
  const classes = useStyles();

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
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};
