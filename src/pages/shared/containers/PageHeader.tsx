import React, { useContext } from 'react';
import { PageHeader as Component } from '../components/PageHeader';
import { UserContext } from '../../../contexts/UserContext';
import { ApplicationContext } from '../../../contexts/ApplicationContext';

export const PageHeader = () => {
  const { user } = useContext(UserContext);
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const toggleSideBar = () => {
    setApplicationValues({
      ...applicationValues,
      isSidebarOpen: !applicationValues.isSidebarOpen,
    });
  };

  if (!user) {
    return <></>;
  }

  return <Component user={user} toggleSideBar={toggleSideBar} />;
};
