import React from 'react';
import { Icon, Tab, Tabs } from '@material-ui/core';
import { SORT_ORDER_TABLE } from '../../../models/Note';

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
      {SORT_ORDER_TABLE.map((table, index) => (
        <Tab
          key={index}
          label={table.label}
          icon={<Icon className={table.icon} />}
        />
      ))}
    </Tabs>
  );
};
