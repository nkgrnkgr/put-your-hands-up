import React, { createContext, useState } from 'react';
import { SortOrderModel, SORT_ORDER_TABLE, useSortOrder } from '../models/Note';

interface EventPageState {
  sortOrder: SortOrderModel;
  selectSortOrderWithIndex: (index: number) => void;
  selectedTags: Set<string>;
  setTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const initialState: EventPageState = {
  sortOrder: SORT_ORDER_TABLE[0],
  selectSortOrderWithIndex: () => {},
  selectedTags: new Set(),
  setTag: () => {},
  removeTag: () => {},
};

export const EventPageContext = createContext<EventPageState>(initialState);

type ContextProps = Partial<EventPageState>;

export const EventPageContextProvider: React.FC<ContextProps> = ({
  children,
}) => {
  const { sortOrder, selectSortOrderWithIndex } = useSortOrder();
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const setTag = (tag: string) => {
    const s = new Set(Array.from(selectedTags.values()));
    setSelectedTags(s.add(tag));
  };

  const removeTag = (tag: string) => {
    const s = new Set(Array.from(selectedTags.values()));
    s.delete(tag);
    setSelectedTags(s);
  };

  return (
    <EventPageContext.Provider
      value={{
        sortOrder,
        selectSortOrderWithIndex,
        selectedTags,
        setTag,
        removeTag,
      }}
    >
      {children}
    </EventPageContext.Provider>
  );
};
