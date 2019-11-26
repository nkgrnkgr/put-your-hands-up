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
import { ExternalLinkSetting } from './ExternalLinkSetting';
import { AnonimouseUserProfile } from './AnonimouseUserProfile';
import { UserModel } from '../../../models/User';
import { AnonymousColor } from '../../../models/AnonymousUser';
import { IntegrationsModel } from '../../../models/Integrations';

interface Props {
  user: UserModel;
  integrations: IntegrationsModel;
  setAnonymousUserInfo: (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => Promise<void>;
  onChangeSettingTwitterIntegration: (isIntegrating: boolean) => {};
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
  integrations,
  setAnonymousUserInfo,
  onChangeSettingTwitterIntegration,
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
          <ExternalLinkSetting
            twitterIntegration={integrations.twitterIntegration}
            onChangeSettingTwitterIntegration={
              onChangeSettingTwitterIntegration
            }
          />
        </Paper>
      )}
    </div>
  );
};
