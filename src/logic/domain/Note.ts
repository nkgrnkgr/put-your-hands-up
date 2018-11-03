export default interface Note {
  comment: string;
  tags: string[];
  createUserId: string;
  fansIds: string[];
  color: string;
  editable: boolean;
  isUpdating: boolean;
  updated: number;
}
