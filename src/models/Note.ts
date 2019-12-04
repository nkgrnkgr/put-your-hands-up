import { UserModel } from './User';
import { useState } from 'react';
import { notStrictEqual } from 'assert';

export const COLOR_HEX = [
  '#F4F4F4',
  '#fdcfe8',
  '#ccff90',
  '#cbf0f8',
  '#fff475',
  '#fbbc04',
  '#d7aefb',
];
export interface NoteModel {
  eventId: string;
  ltId: string;
  id: string;
  noteContents: NoteContentsModel;
  commentIds: string[];
  user: UserModel;
}

export interface NoteContentsModel {
  color: string;
  comment: string;
  createUserId: string;
  created: number;
  fansIds: string[];
  tagTitles: string[];
}

export const defaultNoteContentsValue: NoteContentsModel = {
  color: COLOR_HEX[0],
  comment: '',
  createUserId: '',
  created: 0,
  fansIds: [],
  tagTitles: [],
};

export const recommendComments = [
  '登壇お疲れ様でした👏🏻',
  '勉強になった👨🏻‍💻',
  'わかりみが深い☕️',
];

export const sortByLatest = (notes: NoteModel[]) =>
  notes.sort((a, b) => b.noteContents.created - a.noteContents.created);

export const sortByMostFavolite = (notes: NoteModel[]) =>
  sortByLatest(notes).sort(
    (a, b) => b.noteContents.fansIds.length - a.noteContents.fansIds.length,
  );

export const filterByLt = (notes: NoteModel[], ltId = '0') =>
  notes.filter(note => note.ltId === ltId);

export const filterByTags = (notes: NoteModel[], tags: Set<string>) => {
  return notes.filter(note =>
    note.noteContents.tagTitles.some(tagTitle => tags.has(tagTitle)),
  );
};

export interface SortOrderModel {
  index: number;
  label: string;
  icon: string;
  function: (notes: NoteModel[]) => NoteModel[];
}

export const SORT_ORDER_LABEL = ['latest', 'favorite'];
export const SORT_ORDER_ICON = ['far fa-clock', 'fas fa-heart'];
export const SORT_ORDER_FUNCTION = [sortByLatest, sortByMostFavolite];
const createSortOrderTable = (): SortOrderModel[] =>
  SORT_ORDER_LABEL.map((label, index) => ({
    index,
    label,
    icon: SORT_ORDER_ICON[index],
    function: SORT_ORDER_FUNCTION[index],
  }));

export const SORT_ORDER_TABLE = createSortOrderTable();

export const useSortOrder = (
  defaultSortOrder: SortOrderModel = SORT_ORDER_TABLE[0],
) => {
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const selectSortOrderWithIndex = (index: number) => {
    if (index > -1) {
      setSortOrder(SORT_ORDER_TABLE[index]);
    }
  };

  return { sortOrder, selectSortOrderWithIndex };
};
