import React, { useContext } from 'react';
import { ModalFab as Component } from '../components/ModalFab';
import { ApplicationContext } from '../../../contexts/ApplicationContext';

export const ModalFab = () => {
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const handleOnClick = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenModal: true,
    });
  };

  return <Component handleOnClick={handleOnClick} />;
};
