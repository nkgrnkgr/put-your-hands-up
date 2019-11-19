import React from 'react';
import { Icon, Tab, Tabs } from '@material-ui/core';

interface Props {
  selectedSortTabIndex: number;
  selectSortTab: (index: number) => void;
}

export const SortTab: React.FC<Props> = ({
  selectedSortTabIndex,
  selectSortTab,
}) => {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    selectSortTab(newValue);
  };

  return (
    <Tabs
      variant="fullWidth"
      textColor="primary"
      value={selectedSortTabIndex}
      centered
      onChange={handleChange}
    >
      <Tab label="favorite" icon={<Icon className="fas fa-heart" />} />
      <Tab label="latest" icon={<Icon className="far fa-clock" />} />
    </Tabs>
  );
};
