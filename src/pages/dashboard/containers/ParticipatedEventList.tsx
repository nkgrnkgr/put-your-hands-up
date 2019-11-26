import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { UserModel } from '../../../models/User';
import Loading from '../../shared/components/Loading';
import { ParticipatedEventList as Component } from '../components/ParticipatedEventList';
import { useParticipatedEventList } from '../../../hooks/events';
import { useUser } from '../../../hooks/users';

const updateUserEventIdsParticipated = (
  user: UserModel,
  fetchedUser: UserModel,
): UserModel => {
  return {
    ...user,
    eventIdsParticipated: fetchedUser.eventIdsParticipated,
  };
};

export const ParticipatedEventList = () => {
  const { user, setUser } = useContext(UserContext);
  const { user: fetchedUser, loading: userLoading, error: userError } = useUser(
    user.uid,
    user.isAnonymous,
  );

  const {
    eventList,
    loading: eventListLoading,
    error: eventListError,
  } = useParticipatedEventList(user.eventIdsParticipated);

  useEffect(() => {
    if (fetchedUser) {
      setUser(updateUserEventIdsParticipated(user, fetchedUser));
    }
  }, [fetchedUser]);

  if (userLoading || eventListLoading) {
    return <Loading />;
  }

  if (userError || eventListError) {
    return <>Error</>;
  }

  return <Component eventList={eventList} />;
};
