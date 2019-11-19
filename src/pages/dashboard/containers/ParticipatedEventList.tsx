import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { useParticipatedEventList } from '../../../firebase/api/events';
import { useUser } from '../../../firebase/api/users';
import { UserModel } from '../../../models/User';
import Loading from '../../shared/components/Loading';
import { ParticipatedEventList as Component } from '../components/ParticipatedEventList';

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
  const { userValue, setUserValue } = useContext(UserContext);
  const { user, loading: userLoading, error: userError } = useUser(
    userValue.user.uid,
  );
  const {
    eventList,
    loading: eventListLoading,
    error: eventListError,
  } = useParticipatedEventList(userValue.user.eventIdsParticipated);

  useEffect(() => {
    if (user) {
      setUserValue({
        ...userValue,
        user: updateUserEventIdsParticipated(userValue.user, user),
      });
    }
  }, [user]);

  if (userLoading || eventListLoading) {
    return <Loading />;
  }

  if (eventList.length === 0) {
    return <>empty</>;
  }

  if (userError || eventListError) {
    return <>Error</>;
  }

  return <Component eventList={eventList} />;
};
