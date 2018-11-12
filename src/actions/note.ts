import { Note } from 'domain/Note';
import { actionCreatorFactory } from 'typescript-fsa';

export interface NoteActionPayload {
  noteId?: string;
  note?: Note;
}

const actionCreater = actionCreatorFactory();

export const addNote = actionCreater<NoteActionPayload>('NOTE_ADD');

export const removeNote = actionCreater<NoteActionPayload>('NOTE_REMOVE');

export const updateNote = actionCreater<NoteActionPayload>('NOTE_UPDATE');
