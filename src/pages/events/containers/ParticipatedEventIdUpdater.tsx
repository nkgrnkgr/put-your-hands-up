import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router';
import { updateEventId } from '../../../models/User';

export const ParticipatedEventIdUpdater: React.FC = ({ children }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { user } = useContext(UserContext);
  const { eventId } = useParams();
  useEffect(() => {
    if (eventId) {
      updateEventId(user, eventId);
    }
    // eslint-disable-next-line
  }, [eventId]);

  return <>{children}</>;
};
