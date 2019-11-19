import React from 'react';
import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { UserModel } from '../../../models/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    contents: {
      padding: theme.spacing(3),
    },
    item: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      minWidth: '100px',
      minHeight: '100px',
      border: '7px solid #ff3860',
      padding: theme.spacing(1),
      margin: theme.spacing(2),
    },
    form: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    dispalyUserName: {
      marginLeft: theme.spacing(2),
    },
  }),
);

interface Props {
  user: UserModel;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.contents}>
      <Grid container alignItems="center">
        <Grid item sm={3} xs={12} className={classes.item}>
          <Avatar
            aria-label="userIcon"
            className={classes.avatar}
            src={user.avatarUrl}
          />
        </Grid>
        <Grid item sm={9} xs={12}>
          <form className={classes.form}>
            <Typography component="p" className={classes.dispalyUserName}>
              ユーザー名
            </Typography>
            <Typography variant="h5" className={classes.dispalyUserName}>
              {user.displayName}
            </Typography>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
