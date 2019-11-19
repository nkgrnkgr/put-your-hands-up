import { IncomingHttpHeaders } from 'http';
import { firebase } from '../index';

export interface FunctionsResponse {
  headers: IncomingHttpHeaders;
    body: any; // eslint-disable-line
  error: Error;
  href: string;
}

const functions = firebase.functions();
export const oauthRequestToken = functions.httpsCallable('oauthRequestToken');
export const oauthAcccessToken = functions.httpsCallable('oauthAccessToken');
export const tweet = functions.httpsCallable('tweet');
