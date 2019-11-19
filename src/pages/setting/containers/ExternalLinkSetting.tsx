import React, { useContext } from 'react';
import queryString, { ParsedQuery } from 'query-string';
import { UserContext } from '../../../contexts/UserContext';
import {
  FunctionsResponse,
  oauthRequestToken,
} from '../../../firebase/api/callFunctions';
import { ExternalLinkSetting as Component } from '../components/ExternalLinkSetting';

const onChangeSettingTwitterIntegration = async (isIntegrating: boolean) => {
  if (isIntegrating) {
    try {
      const response = await oauthRequestToken({
        oauth_callback: `${window.location.protocol}//${window.location.host}/apicallback`,
      });
      const data: FunctionsResponse = response.data;
      const body: string = data.body;
      const params: ParsedQuery<string> = queryString.parse(body);
      const { oauth_token } = params;
      window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;
    } catch (error) {
      console.error(error);
    }
  } else {
    // Twitter連携を外すときの処理を書く
    alert('hello');
  }
};

export const ExternalLinkSetting = () => {
  const {
    userValue: { user },
  } = useContext(UserContext);

  return (
    <Component
      twitterIntegration={user.twitterIntegration}
      onChangeSettingTwitterIntegration={onChangeSettingTwitterIntegration}
    />
  );
};
