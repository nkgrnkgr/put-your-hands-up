import * as React from 'react';
import { Note, NoteMap } from 'domain/Note';
import StickyNote from './StickyNote';
// import * as _ from 'lodash';

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
  updateNote?: (noteId: string, note: Note) => void;
}

const board: React.SFC<BoardProps> = ({
  notes = {},
  addNote = (note: Note) => {},
  removeNote = (noteId: string) => {},
  updateNote = (oldNoteId: string, newNote: Note) => {}
}) => (
  <div className="columns is-desktop">
    {createList(notes).map((note, index) => {
      const { user, image, noteContents } = note;
      return (
        <StickyNote
          key={index}
          user={user}
          image={image}
          noteContents={noteContents}
        />
      );
    })}
  </div>
);

export default board;
