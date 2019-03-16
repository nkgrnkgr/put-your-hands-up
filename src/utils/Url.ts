const BASE_URL = `${location.protocol}//${location.host}`;

export const generateEventsUrl = (id: string): string => {
  return `${BASE_URL}/events/${id}/`;
};

export const generateEditLtUrl = (id: string, index: number): string => {
  return `${BASE_URL}/editlt/${id}/${index}`;
};
