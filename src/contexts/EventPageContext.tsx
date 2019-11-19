import React, { createContext } from 'react';
import { SortOrderModel, SORT_ORDER_TABLE, useSortOrder } from '../models/Note';

interface EventPageState {
  sortOrder: SortOrderModel;
  selectSortOrderWithIndex: (index: number) => void;
}

const initialState: EventPageState = {
  sortOrder: SORT_ORDER_TABLE[0],
  selectSortOrderWithIndex: () => {},
};

export const EventPageContext = createContext<EventPageState>(initialState);

type ContextProps = Partial<EventPageState>;

export const EventPageContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const { sortOrder, selectSortOrderWithIndex } = useSortOrder();

  return (
    <EventPageContext.Provider value={{ sortOrder, selectSortOrderWithIndex }}>
      {children}
    </EventPageContext.Provider>
  );
};
