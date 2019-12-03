import React, { useState } from 'react';
import { ConfirmDialog } from '../pages/shared/components/ConfirmDialog';

export const useConfirmModal = (
  message: string,
  okClickHandler: Function,
  cancelClickHandler: Function,
) => {
  const [isOpen, setOpen] = useState(false);

  const openConfirmDialog = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const ModalComponent = () => (
    <ConfirmDialog
      open={isOpen}
      onClose={onClose}
      message={message}
      okClickHandler={okClickHandler}
      cancelClickHandler={cancelClickHandler}
    />
  );

  return { ModalComponent, openConfirmDialog };
};
