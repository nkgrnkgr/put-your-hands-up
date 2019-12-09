import {
  createStyles,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { AnonymousColor } from '../../../models/AnonymousUser';
import { IntegrationsModel } from '../../../models/Integrations';
import { UserModel } from '../../../models/User';
import { AnonimouseUserProfile } from './AnonimouseUserProfile';
import { ExternalLinkSetting } from './ExternalLinkSetting';
import { UserProfile } from './UserProfile';
import { DeleteUserButton } from './DeleteUserButton';

interface Props {
  user: UserModel;
  integrations: IntegrationsModel;
  setAnonymousUserInfo: (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => Promise<void>;
  onChangeSettingTwitterIntegration: (isIntegrating: boolean) => void;
  onClickDeleteUserButton: () => void;
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
    contents: {
      marginBottom: theme.spacing(2),
    },
    item: {
      display: 'flex',
    },
  }),
);

export const UserSetting: React.FC<Props> = ({
  user,
  integrations,
  setAnonymousUserInfo,
  onChangeSettingTwitterIntegration,
  onClickDeleteUserButton,
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
          <DeleteUserButton onClickDeleteButton={onClickDeleteUserButton} />
        </Paper>
      )}
    </div>
  );
};
