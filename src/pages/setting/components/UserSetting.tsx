import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core';
import { UserProfile } from './UserProfile';
import { ExternalLinkSetting } from '../containers/ExternalLinkSetting';
import { AnonimouseUserProfile } from './AnonimouseUserProfile';
import { UserModel, AnonymousColor } from '../../../models/User';

interface Props {
  user: UserModel;
  setAnonymousUserInfo: (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '720px',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
  }),
);

export const UserSetting: React.FC<Props> = ({
  user,
  setAnonymousUserInfo,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        ユーザー設定
      </Typography>
      {user.isAnonymous && (
        <Paper>
          <AnonimouseUserProfile
            user={user}
            setAnonymousUserInfo={setAnonymousUserInfo}
          />
        </Paper>
      )}
      {user.isAnonymous || (
        <Paper>
          <UserProfile user={user} />
          <Divider />
          <ExternalLinkSetting />
        </Paper>
      )}
    </div>
  );
};
