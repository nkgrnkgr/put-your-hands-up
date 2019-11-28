import React, { useContext } from 'react';
import { Notification as Component } from '../components/Notification';
import { NotificationContext } from '../../../contexts/NotificationContext';

export const Notification = () => {
  const { notificationSetting } = useContext(NotificationContext);
  const { isOpen, close, message, variant } = notificationSetting;

  return (
    <Component
      isOpen={isOpen}
      close={close}
      message={message}
      variant={variant}
    />
  );
};
