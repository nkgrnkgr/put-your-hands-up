import React, { useContext } from 'react';
import { EventPageContext } from '../../../contexts/EventPageContext';
import { SortTab as Component } from '../components/SortTab';

export const SortTab = () => {
  const { sortOrder, selectSortOrderWithIndex } = useContext(EventPageContext);

  return (
    <Component
      selectedSortTabIndex={sortOrder.index}
      selectSortTab={selectSortOrderWithIndex}
    />
  );
};
