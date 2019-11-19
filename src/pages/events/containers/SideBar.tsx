import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { SideBar as SideBarComponent } from '../components/SideBar';
import { LTModel } from '../../../models/Event';

interface Props {
  lts: LTModel[];
}

export const SideBar = (props: Props) => {
  const { lts } = props;
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const toggleSideBar = () => {
    setApplicationValues({
      ...applicationValues,
      isSidebarOpen: !applicationValues.isSidebarOpen,
    });
  };

  return (
    <SideBarComponent
      lts={lts}
      isSidebarOpen={applicationValues.isSidebarOpen}
      toggleSideBar={toggleSideBar}
    />
  );
};
