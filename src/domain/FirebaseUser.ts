import { Color } from 'domain/Anonymous';
export interface FirebaseUser {
  displayName: string;
  avatarUrl: string;
  uid: string;
  isAnonymous?: boolean;
  anonymousColor?: Color;
  eventIdsParticipated?: string[];
  twitterId?: string;
}
