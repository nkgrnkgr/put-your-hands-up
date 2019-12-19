import { createRandomId } from '../utils/utils';
import { now } from '../utils/datetime';

export interface EventModel {
  id: string;
  name: string;
  hashTag: string;
  date: number;
  lts: LTModel[];
  organizerUids: { [key: string]: true };
  connppassEventUrl?: string;
  memo?: string;
}

export interface LTModel {
  id: string;
  speakerName: string;
  title: string;
  documentUrl1: string;
  documentUrl2: string;
  documentUrl3: string;
}

export const initialMemo = (
  eventTitle = 'xxMeetUp',
  eventCatch = '今回のテーマはxxxです',
  hashTag = 'pyhu',
  connpassUrl = '',
) => {
  return `# 🌈${eventTitle}

${eventCatch}

### ✨Features
- 勉強会参加者が登壇者に気軽にフィードバックを投稿することができます🖐🏻
- 投稿はこのページにログインしている全員にリアルタイムに共有されます😻
- 投稿には「いいね♥️」または「返信💬」ができます
- Twitterアカウントと連携してTwitterにも投稿が可能です🐦 Twitter連携は[こちら](/setting)
- サイドバーの general はイベント全般、それ以外は登壇者ごとのページで投稿してください👏🏻
- Twitterのハッシュタグは [#${hashTag}](https://twitter.com/hashtag/${hashTag}) です

### 📢Infomation
- [connpass](${connpassUrl})

### 💎etc
- 機能要望・不具合の報告は[こちら](https://github.com/nkgrnkgr/put-your-hands-up/issues/new)

`;
};

export const createInitialEventModelValue = (uid: string): EventModel => {
  return {
    id: '',
    name: '',
    hashTag: '',
    date: now(),
    lts: [],
    organizerUids: { [uid]: true },
    connppassEventUrl: '',
    memo: initialMemo(),
  };
};

export const createInitialLTModelValue = (): LTModel => {
  return {
    id: createRandomId(),
    speakerName: '',
    title: '',
    documentUrl1: '',
    documentUrl2: '',
    documentUrl3: '',
  };
};

export const sortByDateDesc = (events: EventModel[]) => {
  const l = [...events];

  return l.sort((e1, e2) => e2.date - e1.date);
};
