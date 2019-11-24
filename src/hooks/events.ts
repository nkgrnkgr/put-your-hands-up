import { useEffect, useState } from 'react';
import {
  fetchParticipatedEventList,
  fetchOrganizersEventList,
} from '../firebase/api/events';
import { EventModel } from '../models/Event';

export const useParticipatedEventList = (eventIds: string[]) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedEventList = await fetchParticipatedEventList(eventIds);
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
          const fetchedEventList = await fetchOrganizersEventList(uid);
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
