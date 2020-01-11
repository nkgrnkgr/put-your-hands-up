import { EventModel } from '../../models/Event';
import { db } from '../index';
import { todaysEnd, todaysStart } from './../../utils/datetime';

const COLLECTION_KEY = 'events';
const COLLECTION = db.collection(COLLECTION_KEY);

export const getEvent = async (eventId: string) => {
  const doc = await COLLECTION.doc(eventId).get();

  return doc.data() as EventModel;
};

export const addEvent = async (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const documentRef = await collection.add(event);
  const snapshot = await documentRef.get();
  await documentRef.update({ id: snapshot.id });
};

export const updateEvent = async (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const documentRef = await collection.doc(event.id);
  documentRef.update({ ...event });
};

export const deleteEvent = (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const documentRef = collection.doc(event.id);
  documentRef.delete();
};

export const getParticipatedEventList = async (eventIds: string[]) => {
  const fetchedEventList: EventModel[] = [];

  await Promise.all(
    eventIds.map(async id => {
      const doc = await COLLECTION.doc(id).get();
      const eventdata = doc.data() as EventModel;
      if (eventdata) {
        fetchedEventList.push(eventdata);
      }
    }),
  );

  return fetchedEventList;
};

export const getTodaysEventList = async () => {
  return new Promise<EventModel[]>(resolve => {
    const start = todaysStart();
    const end = todaysEnd();
    const fetchedEventList: EventModel[] = [];
    COLLECTION.where('date', '>=', start)
      .where('date', '<=', end)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          const event = doc.data() as EventModel;
          if (event) {
            fetchedEventList.push(event);
          }
        });
        resolve(fetchedEventList);
      });
  });
};

export const getOrganizersEventList = (uid: string) => {
  return new Promise<EventModel[]>(resolve => {
    const fetchedEventList: EventModel[] = [];
    COLLECTION.where(`organizerUids.${uid}`, '==', true).onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          const event = doc.data() as EventModel;
          if (event) {
            fetchedEventList.push(event);
          }
        });
        resolve(fetchedEventList);
      },
    );
  });
};
