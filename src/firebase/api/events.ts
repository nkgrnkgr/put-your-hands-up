import { db } from '../index';
import { useState, useEffect } from 'react';
import { EventModel } from '../../models/Event';

export const useParticipatedEventList = (eventIds: string[]) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const collection = db.collection('events');

    const createEventList = async () => {
      setLoading(true);
      try {
        const t: EventModel[] = [];
        await Promise.all(
          eventIds.map(async id => {
            const doc = await collection.doc(id).get();
            const eventdata = doc.data() as EventModel;
            t.push(eventdata);
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
    const collection = db.collection('events');

    const createEventList = async () => {
      if (uid !== '') {
        collection
          .where(`organizerUids.${uid}`, '==', true)
          .onSnapshot(querySnapshot => {
            const t: EventModel[] = [];
            try {
              querySnapshot.forEach(doc => {
                const event = doc.data() as EventModel;
                t.push(event);
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
    const collection = db.collection('events');

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
