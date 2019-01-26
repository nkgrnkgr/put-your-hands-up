export interface Event {
  id: string;
  name: string;
  url: string;
  date: number;
  organizerUids: { string: boolean };
  ltTitles: string[];
}

export interface Events {
  events: Event[];
}
