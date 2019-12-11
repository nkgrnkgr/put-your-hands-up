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

export const createInitialEventModelValue = (uid: string): EventModel => {
  return {
    id: '',
    name: '',
    hashTag: '',
    date: now(),
    lts: [],
    organizerUids: { [uid]: true },
    connppassEventUrl: '',
    memo: '',
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
