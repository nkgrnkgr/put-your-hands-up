export interface Event {
  id: string;
  name: string;
  url: string;
  date: number;
  organizerUid: string;
  ltTitles: string[];
}

export interface EventMap {
  [s: string]: Event;
}
