import { FirebaseUser } from './FirebaseUser';
import NoteContents from 'domain/NoteContents';

export interface Note {
  id: string;
  user: FirebaseUser;
  noteContents: NoteContents;
  ltId: string;
  eventId: string;
}
