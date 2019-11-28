import queryString, { ParsedQuery } from 'query-string';
import React, { useContext } from 'react';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { UserContext } from '../../../contexts/UserContext';
import {
  FunctionsResponse,
  oauthRequestToken,
} from '../../../firebase/api/callFunctions';
import { addOrUpdateIntegrations } from '../../../firebase/api/integrations';
import { AnonymousColor } from '../../../models/AnonymousUser';
import { UserModel } from '../../../models/User';
import { save } from '../../../utils/localStorageAccessor';
import { UserSetting as Component } from '../components/UserSetting';
import { NotificationContext } from '../../../contexts/NotificationContext';

export const UserSetting = () => {
  const { user, setUser } = useContext(UserContext);
  const { integrations, setIntegrations } = useContext(IntegrationsContext);
  const { uid } = user;
  const { callNotification } = useContext(NotificationContext);
  const onChangeSettingTwitterIntegration = async (isIntegrating: boolean) => {
    if (isIntegrating) {
      try {
        const response = await oauthRequestToken({
          oauth_callback: `${window.location.protocol}//${window.location.host}/apicallback`,
        });

        const data: FunctionsResponse<string> = response.data;
        const body = data.body;
        const params: ParsedQuery<string> = queryString.parse(body);
        const { oauth_token } = params;
        window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
      } catch (error) {
        callNotification(
          'データの更新に失敗しました。ページをリロードしてやり直してください',
          'error',
        );
      }
    } else {
      addOrUpdateIntegrations({ id: uid });
      setIntegrations({ id: uid });
    }
  };

  const setAnonymousUserInfo = (
    displayName: string,
    anonymousColor: AnonymousColor,
  ) => {
    return new Promise<void>(resolve => {
      if (user) {
        const updatedUser: UserModel = {
          ...user,
          displayName,
          avatarUrl: anonymousColor.anonymousImage,
          anonymousColor,
        };
        save('user', updatedUser);
        setUser(updatedUser);
        resolve();
      }
    });
  };

  return (
    <Component
      user={user}
      integrations={integrations}
      setAnonymousUserInfo={setAnonymousUserInfo}
      onChangeSettingTwitterIntegration={onChangeSettingTwitterIntegration}
    />
  );
};
