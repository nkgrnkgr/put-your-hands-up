import { Event } from './Event';
import { createRandomId } from 'utils/Id';

const GENERALTABINDEX = '0';

export interface Lt {
  id: string;
  title: string;
  speakerName: string;
  documentUrl1: string;
  documentUrl2: string;
  documentUrl3: string;
}

export const getLtId = (selectedTabIndex: number, event: Event): string => {
  if (selectedTabIndex > 0) {
    return event.lts[selectedTabIndex - 1].id;
  }
  return GENERALTABINDEX;
};

export const createInitialValue = (): Lt => {
  return {
    id: createRandomId(),
    title: '',
    speakerName: '',
    documentUrl1: '',
    documentUrl2: '',
    documentUrl3: ''
  };
};
