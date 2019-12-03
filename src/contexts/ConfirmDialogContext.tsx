import React, { createContext, useState } from 'react';
import { ConfirmDialogProps } from '../pages/shared/components/ConfirmDialog';

interface ConfirmDialogState {
  settings: ConfirmDialogProps;
  setConfirmDialogSettings: React.Dispatch<
    React.SetStateAction<ConfirmDialogProps>
  >;
}

const createInitialValue = () => ({
  message: '',
  open: false,
  onClose: () => {},
  okClickHandler: () => {},
  cancelClickHandler: () => {},
});

const initialState: ConfirmDialogState = {
  settings: createInitialValue(),
  setConfirmDialogSettings: () => {},
};

export const ConfirmDialogContext = createContext<ConfirmDialogState>(
  initialState,
);

type ContextProps = Partial<ConfirmDialogState>;

export const ConfirmDialogContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const [settings, setConfirmDialogSettings] = useState<ConfirmDialogProps>(
    createInitialValue(),
  );

  return (
    <ConfirmDialogContext.Provider
      value={{ settings, setConfirmDialogSettings }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};
