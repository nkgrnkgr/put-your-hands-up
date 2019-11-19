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
