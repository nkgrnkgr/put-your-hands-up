import { Lt } from 'domain/Lt';

export interface Event {
  id: string;
  name: string;
  url: string;
  date: number;
  organizerUids: { string: boolean };
  lts: Lt[];
}

export interface Events {
  events: Event[];
}
