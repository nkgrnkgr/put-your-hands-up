import {
  getTodaysEventList,
  getParticipatedEventList,
  getOrganizersEventList,
  getEventSnapshot,
  getEvent,
} from './../firebase/api/events';
import { useEffect, useState, useMemo } from 'react';

import { EventModel } from '../models/Event';

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (eventId !== '') {
          const event = await getEvent(eventId);
          setEvent(event);
          setError(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [eventId]);

  return { event, loading, error };
};

export const useEventSnapshot = (eventId: string) => {
  const [event, setEvent] = useState<EventModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useMemo(() => {
    try {
      if (eventId !== '') {
        getEventSnapshot(eventId, setEvent);
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
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

export const useTodaysEventList = () => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedEventList = await getTodaysEventList();
        setEventList(fetchedEventList);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

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
