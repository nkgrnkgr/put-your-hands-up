import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { UserModel } from '../../../models/User';
import Loading from '../../shared/components/Loading';
import { ParticipatedEventList as Component } from '../components/ParticipatedEventList';
import { useParticipatedEventList } from '../../../hooks/events';
import { useUser } from '../../../hooks/users';
import { NotificationContext } from '../../../contexts/NotificationContext';

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
    user,
  );
  const { callNotification } = useContext(NotificationContext);

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
    callNotification(
      'データの取得に失敗しました。ページをリロードしてください',
      'error',
    );
  }

  return <Component eventList={eventList} />;
};
