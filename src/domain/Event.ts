export interface Event {
  id: string;
  name: string;
  date: string;
  organizerUid: string;
  ltTitles: string[];
}

export interface EventMap {
  [s: string]: Event;
}
