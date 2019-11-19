import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import { UserModel } from '../../../models/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    avatar: {
      margin: theme.spacing(0.5),
      border: '1px solid #ff3860',
      height: '25px',
      width: '25px',
    },
  }),
);

interface Props {
  users: UserModel[];
}

export const ParticipatedUsers: React.FC<Props> = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users.map(user => (
        <Tooltip title={user.displayName} key={user.uid}>
          <Avatar
            className={classes.avatar}
            key={user.uid}
            src={user.avatarUrl}
          />
        </Tooltip>
      ))}
    </div>
  );
};
