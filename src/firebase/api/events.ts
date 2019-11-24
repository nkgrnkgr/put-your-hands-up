import { db } from '../index';
import { useState, useEffect } from 'react';
import { EventModel } from '../../models/Event';
import { ConnpassEvent } from 'connpass/lib/src/types';
import { searchConnpassEvent, FunctionsResponse } from './callFunctions';

const COLLECTION_KEY = 'events';

export const useParticipatedEventList = (eventIds: string[]) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection(COLLECTION_KEY);

    const createEventList = async () => {
      setLoading(true);
      try {
        const t: EventModel[] = [];
        await Promise.all(
          eventIds.map(async id => {
            const doc = await collection.doc(id).get();
            const eventdata = doc.data() as EventModel;
            if (eventdata) {
              t.push(eventdata);
            }
          }),
        );
        setEventList(t);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    createEventList();
  }, [eventIds]);

  return { eventList, loading, error };
};

export const useOrganizersEventList = (uid: string) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection(COLLECTION_KEY);

    const createEventList = async () => {
      if (uid !== '') {
        collection
          .where(`organizerUids.${uid}`, '==', true)
          .onSnapshot(querySnapshot => {
            const t: EventModel[] = [];
            try {
              querySnapshot.forEach(doc => {
                const event = doc.data() as EventModel;
                if (event) {
                  t.push(event);
                }
              });
              setEventList(t);
            } catch (err) {
              setError(err);
            }
          });
      }
      setLoading(false);
    };

    createEventList();
  }, [uid]);

  return { eventList, loading, error };
};

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection(COLLECTION_KEY);

    const createEventList = async () => {
      try {
        if (eventId !== '') {
          const doc = await collection.doc(eventId).get();
          const e = doc.data() as EventModel;
          setEvent(e);
        }
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    createEventList();
  }, [eventId]);

  return { event, loading, error };
};

export const addEvent = async (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  try {
    const documentRef = await collection.add(event);
    const snapshot = await documentRef.get();
    await documentRef.update({ id: snapshot.id });
  } catch (err) {
    console.error(err);
  }
};

export const updateEvent = async (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  try {
    const documentRef = await collection.doc(event.id);
    documentRef.update({ ...event });
  } catch (err) {
    console.error(err);
  }
};

export const deleteEvent = (event: EventModel) => {
  const collection = db.collection(COLLECTION_KEY);
  const documentRef = collection.doc(event.id);

  try {
    documentRef.delete();
  } catch (err) {
    console.error(err);
  }
};

export const useConnpassEventData = (event_id: string) => {
  const [connpassEvent, setConnpassEvent] = useState<ConnpassEvent | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        if (event_id === '') {
          throw new Error('urlを正しく入力してください');
        }
        const response = await searchConnpassEvent({
          event_id: Number(event_id),
        });
        const responseData = response.data as FunctionsResponse<
          ConnpassEvent[]
        >;
        setConnpassEvent(responseData.body[0]);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [event_id]);

  return { connpassEvent, loading, error };
};
