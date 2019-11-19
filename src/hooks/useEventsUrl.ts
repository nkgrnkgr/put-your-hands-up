import queryString, { ParsedQuery } from 'query-string';
import { useLocation, useParams } from 'react-router';

export const useEventsUrl = () => {
  const location = useLocation();
  const params: ParsedQuery<string> = queryString.parse(location.search);
  const { ltId, noteId } = params;

  const convertedltId = typeof ltId === 'string' ? ltId : null;
  const convertedNoteId = typeof noteId === 'string' ? noteId : null;
  const { eventId } = useParams();

  return {
    eventId: eventId,
    ltId: convertedltId,
    noteId: convertedNoteId,
  };
};
