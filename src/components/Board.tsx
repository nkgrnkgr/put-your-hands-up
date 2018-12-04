import * as React from 'react';
import { Note, NoteMap } from 'domain/Note';
import StickyNote from './StickyNote';
import InputForm from 'containers/InputForm';
import ConfirmModal from './ConfirmModal';

const createList = (notes: NoteMap): Note[] => {
  if (notes === {}) {
    return [];
  }
  const noteList: Note[] = [];
  Object.keys(notes).map((key, index) => {
    noteList.push(notes[key]);
  });
  return noteList;
};

export interface BoardProps {
  notes?: NoteMap;
  addNote?: (note: Note) => void;
  removeNote?: (noteId: string) => void;
}

const board: React.SFC<BoardProps> = ({
  notes = {},
  addNote = (note: Note) => {},
  removeNote = (noteId: string) => {}
}) => (
  <div className="columns is-desktop">
    {createList(notes).map((note, index) => (
      <StickyNote key={index} note={note} removeNote={removeNote} />
    ))}
    <ConfirmModal
      message={'本当に削除してよろしいですか？'}
      ok={f}
      cancel={f}
    />
    <InputForm />
  </div>
);

const f = () => {};

export default board;
