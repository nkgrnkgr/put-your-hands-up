import { useEffect, useState } from 'react';
import { getParticipatedEventList } from '../firebase/api/events';
import { EventModel } from '../models/Event';

export const useParticipatedEventList = (eventIds: string[]) => {
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const createEventList = async () => {
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

    createEventList();
  }, [eventIds]);

  return { eventList, loading, error };
};
