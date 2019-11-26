export interface IntegrationsModel {
  id: string;
  twitterIntegration?: TwitterIntegration;
}

export interface TwitterIntegration {
  screenName: string;
  accessToken: string;
  accessTokenSecret: string;
}

export const createInitialValue = (): IntegrationsModel => ({
  id: '',
});
