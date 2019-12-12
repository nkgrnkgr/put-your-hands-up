import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { CreateNewEventButton as Component } from '../components/CreateNewEventButton';

export const ParticipatedEventList = () => {
  const { user } = useContext(UserContext);

  if (user.isAnonymous) {
    return <></>;
  }

  return <Component />;
};
