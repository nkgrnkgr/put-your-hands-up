import React, { createContext, useState } from 'react';
import { NotificationProps } from '../pages/shared/components/Notification';

export type VariantType = 'success' | 'error' | 'info' | 'warning';

interface State {
  notificationSetting: NotificationProps;
  callNotification: (message: string, variant: VariantType) => void;
}

const initialState: State = {
  notificationSetting: {
    isOpen: false,
    close: () => {},
    message: '',
    variant: 'success',
  },
  callNotification: () => {},
};

export const NotificationContext = createContext<State>(initialState);

type ContextProps = Partial<State>;

export const NotificationContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<VariantType>('success');

  const callNotification = (message: string, variant: VariantType) => {
    setMessage(message);
    setVariant(variant);
    setOpen(true);
  };
  const close = () => setOpen(false);

  return (
    <NotificationContext.Provider
      value={{
        notificationSetting: {
          isOpen,
          close,
          message,
          variant,
        },
        callNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
