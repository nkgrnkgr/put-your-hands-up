import { Color } from 'react-color';
export default interface NoteContents {
  comment: string;
  tagTitles: string[];
  createUserId: string;
  fansIds: string[];
  color: Color;
  created: number;
}
