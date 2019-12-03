import React, { createContext, useState } from 'react';
import { ConfirmDialogProps } from '../pages/shared/components/ConfirmDialog';

interface ConfirmDialogState {
  confirmSetting: ConfirmDialogProps;
  callConfirmDialog: (
    message: string,
    okClickHandler: (value?: any) => void,
    cancelClickHandler: (value?: any) => void,
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
  const [settings, setSetting] = useState<ConfirmDialogProps>(
    createInitialValue(),
  );

  const onClose = () => {
    setSetting({
      ...settings,
      open: false,
    });
  };

  const callConfirmDialog = (
    message: string,
    okClickHandler: (value?: any) => void,
    cancelClickHandler: (value?: any) => void,
  ): void => {
    setSetting({
      ...settings,
      open: true,
      message,
      okClickHandler,
      cancelClickHandler,
    });
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        confirmSetting: {
          ...settings,
          onClose,
        },
        callConfirmDialog,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};
