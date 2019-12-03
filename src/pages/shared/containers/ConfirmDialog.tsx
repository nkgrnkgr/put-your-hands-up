import React, { useContext } from 'react';
import { ConfirmDialog as Component } from '../components/ConfirmDialog';
import { ConfirmDialogContext } from '../../../contexts/ConfirmDialogContext';

export const ConfirmDialog = () => {
  const { confirmSetting: settings } = useContext(ConfirmDialogContext);

  return <Component {...settings} />;
};
