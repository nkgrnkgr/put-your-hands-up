import { useEffect, useState } from 'react';
import {
  getParticipatedEventList,
  getOrganizersEventList,
  getEvent,
} from '../firebase/api/events';
import { EventModel } from '../models/Event';

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedEvent = await getEvent(eventId);
        setEvent(fetchedEvent);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [eventId]);

  return { event, loading, error };
};

export const useParticipatedEventList = (eventIds: string[]) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedEventList = await getParticipatedEventList(eventIds);
        setEventList(fetchedEventList);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [eventIds]);

  return { eventList, loading, error };
};

export const useOrganizersEventList = (uid: string) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (uid !== '') {
          const fetchedEventList = await getOrganizersEventList(uid);
          setEventList(fetchedEventList);
        }
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [uid]);

  return { eventList, loading, error };
};
