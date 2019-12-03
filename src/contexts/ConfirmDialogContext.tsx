import React, { createContext, useState } from 'react';
import { ConfirmDialogProps } from '../pages/shared/components/ConfirmDialog';

interface ConfirmDialogState {
  confirmSetting: ConfirmDialogProps;
  callConfirmDialog: (
    message: string,
    okClickHandler: Function,
    cancelClickHandler: Function,
  ) => void;
}

const createInitialValue = () => ({
  message: '',
  open: false,
  onClose: () => {},
  okClickHandler: () => {},
  cancelClickHandler: () => {},
});

const initialState: ConfirmDialogState = {
  confirmSetting: createInitialValue(),
  callConfirmDialog: () => {},
};

export const ConfirmDialogContext = createContext<ConfirmDialogState>(
  initialState,
);

type ContextProps = Partial<ConfirmDialogState>;

export const ConfirmDialogContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState(false);

  const [message, setMessage] = useState('');
  const [okClickHandler, setOkClickHandler] = useState();
  const [cancelClickHandler, setCancelClickHandler] = useState();

  const callConfirmDialog = (
    message: string,
    okClickHandler: Function,
    cancelClickHandler: Function,
  ): void => {
    setMessage(message);
    setOkClickHandler(okClickHandler);
    setCancelClickHandler(cancelClickHandler);
    setOpen(true);
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        confirmSetting: {
          message,
          open: isOpen,
          onClose: () => setOpen(false),
          okClickHandler,
          cancelClickHandler,
        },
        callConfirmDialog,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};
