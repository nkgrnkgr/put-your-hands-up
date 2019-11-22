import { createRandomId } from '../utils/utils';
import { now } from '../utils/datetime';

export interface EventModel {
  id: string;
  name: string;
  date: number;
  lts: LTModel[];
}

export interface LTModel {
  id: string;
  speakerName: string;
  title: string;
  documentUrl1: string;
  documentUrl2: string;
  documentUrl3: string;
}

export const createInitialEventModelValue = (): EventModel => {
  return {
    id: createRandomId(),
    name: '',
    date: now(),
    lts: [],
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
