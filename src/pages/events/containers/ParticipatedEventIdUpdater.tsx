import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router';
import { updateEventId } from '../../../models/User';

export const ParticipatedEventIdUpdater: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const { eventId } = useParams();
  useEffect(() => {
    if (eventId) {
      updateEventId(user, eventId);
    }
  }, [eventId]);

  return <>{children}</>;
};
