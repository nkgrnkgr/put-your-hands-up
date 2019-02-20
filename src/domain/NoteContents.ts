import { Color } from 'react-color';
export default interface NoteContents {
  comment: string;
  tagTitles: string[];
  createUserId: string;
  fansIds: string[];
  color: Color;
  created: number;
}

export const INITIAL_VALUE: NoteContents = {
  comment: '',
  tagTitles: [],
  createUserId: '',
  fansIds: [],
  color: '#F4F4F4',
  created: new Date().getTime()
};

export const FEATURED_CONTENTS = [
  '登壇お疲れさまでした👏',
  '完全に理解した🤯',
  '勉強になった✍',
  '強い...💪'
];

export const FEATURED_TAGS = [
  '質問',
  '🔰初心者',
  'マサカリ',
  'Spark Joy😻',
  'ちょっと何言っているかわからない'
];

export const COLORS = [
  '#F4F4F4',
  '#fdcfe8',
  '#ccff90',
  '#cbf0f8',
  '#fff475',
  '#fbbc04',
  '#d7aefb'
];
