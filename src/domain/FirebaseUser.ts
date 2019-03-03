import { Color } from 'domain/Anonymous';
import { createSetFrom } from 'utils/Utils';
export interface FirebaseUser {
  displayName: string;
  avatarUrl: string;
  uid: string;
  isAnonymous?: boolean;
  anonymousColor?: Color;
  eventIdsParticipated?: string[];
  twitterId?: string;
}

export const registerUid = (firestore: Firestore, uid: string) => {
  if (firestore && firestore.update) {
    firestore.update(
      { collection: 'users', doc: uid },
      {
        uid
      }
    );
  }
};

export const registerEventId = (
  firestore: Firestore,
  user: FirebaseUser,
  eventId: string
) => {
  const { uid, eventIdsParticipated = [] } = user;
  if (eventIdsParticipated.indexOf(eventId) > -1) return;
  if (firestore && firestore.update) {
    firestore.update(
      { collection: 'users', doc: uid },
      {
        eventIdsParticipated: createSetFrom(eventId, eventIdsParticipated)
      }
    );
  }
};

export const fetchUser = async (firestore: Firestore, uid: string) => {
  if (firestore && firestore.get) {
    const doc = await firestore.get({ collection: 'users', doc: uid });
    const user: FirebaseUser = doc.data();
    return user;
  }
  return null;
};
