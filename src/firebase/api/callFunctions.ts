import { IncomingHttpHeaders } from 'http';
import { firebase } from '../index';

export interface FunctionsResponse<T> {
  headers: IncomingHttpHeaders;
  body: T;
  error: Error;
  href: string;
}

const functions = firebase.functions();
interface ReqestTokenParam {
  oauth_callback: string;
}
const callOauthRequestToken = functions.httpsCallable('oauthRequestToken');
export const oauthRequestToken = (param: ReqestTokenParam) =>
  callOauthRequestToken(param);

interface AccessTokenParam {
  oauth_token: string;
  oauth_verifier: string;
}
const callOauthAccessToken = functions.httpsCallable('oauthAccessToken');
export const oauthAccessToken = (param: AccessTokenParam) =>
  callOauthAccessToken(param);

const callTweet = functions.httpsCallable('tweet');
interface TweetParam {
  oauth_token: string;
  oauth_token_secret: string;
  status: string;
}
export const tweet = (param: TweetParam) => callTweet(param);

interface SearchConnpassEvent {
  event_id: number;
}

const callSearchConnpassEvent = functions.httpsCallable('searchConnpassEvent');

export const searchConnpassEvent = (param: SearchConnpassEvent) =>
  callSearchConnpassEvent(param);
