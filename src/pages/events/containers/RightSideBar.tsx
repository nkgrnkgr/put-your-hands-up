import React, { useContext } from 'react';
import { RightSideBar as Component } from '../components/RightSideBar';
import { ApplicationContext } from '../../../contexts/ApplicationContext';

export const RightSideBar = () => {
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const closeDrawer = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenReplayComments: false,
    });
  };

  return (
    <Component
      isOpen={applicationValues.isOpenReplayComments}
      handleOnCloseDrawer={closeDrawer}
    />
  );
};
