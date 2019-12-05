import React, { useContext } from 'react';
import { PageHeader as Component } from '../components/PageHeader';
import { UserContext } from '../../../contexts/UserContext';
import { ApplicationContext } from '../../../contexts/ApplicationContext';

interface Props {
  menuTitles?: string[];
  shouldMobileMenu?: boolean;
}

export const PageHeader = (props: Props) => {
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

  return <Component {...props} user={user} toggleSideBar={toggleSideBar} />;
};
