import queryString, { ParsedQuery } from 'query-string';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import {
  FunctionsResponse,
  oauthRequestToken,
} from '../../../firebase/api/callFunctions';
import { UserModel } from '../../../models/User';
import { save } from '../../../utils/localStorageAccessor';
import { UserSetting as Component } from '../components/UserSetting';
import { AnonymousColor } from '../../../models/AnonymousUser';
import { IntegrationsContext } from '../../../contexts/IntegrationsContext';
import { addOrUpdateIntegrations } from '../../../firebase/api/integrations';
import { useIntegrations } from '../../../hooks/integrations';

export const UserSetting = () => {
  const { userValue, setUserValue } = useContext(UserContext);
  const { integrations, setIntegrations } = useContext(IntegrationsContext);
  const { uid } = userValue.user;
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
        console.error(error);
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
      const { user } = userValue;
      if (user) {
        const updatedUser: UserModel = {
          ...user,
          displayName,
          avatarUrl: anonymousColor.anonymousImage,
          anonymousColor,
        };
        save('user', updatedUser);
        setUserValue({
          ...userValue,
          user: updatedUser,
        });
        resolve();
      }
    });
  };

  return (
    <Component
      user={userValue.user}
      integrations={integrations}
      setAnonymousUserInfo={setAnonymousUserInfo}
      onChangeSettingTwitterIntegration={onChangeSettingTwitterIntegration}
    />
  );
};
