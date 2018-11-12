import { Color } from './Color';

export default interface NoteContents {
  comment: string;
  tagTitles: string[];
  createUserId: string;
  fansIds: string[];
  color: Color;
  editable: boolean;
  isUpdating: boolean;
  updated: number;
}
