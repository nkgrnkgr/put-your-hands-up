export interface Event {
  id: string;
  name: string;
  date: number;
  organizerUid: string;
  ltTitles: string[];
}

export interface EventMap {
  [s: string]: Event;
}
