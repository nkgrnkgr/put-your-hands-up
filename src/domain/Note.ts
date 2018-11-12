import Image from 'domain/Image';
import { User } from 'domain/User';
import NoteContens from 'domain/NoteContens';

export interface Note {
  noteId: string;
  user: User;
  image: Image;
  noteContents: NoteContens;
}

export interface NoteMap {
  [s: string]: Note;
}
