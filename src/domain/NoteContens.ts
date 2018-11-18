export default interface NoteContents {
  comment: string;
  tagTitles: string[];
  createUserId: string;
  fansIds: string[];
  color: string;
  editable: boolean;
  isUpdating: boolean;
  updated: number;
}
