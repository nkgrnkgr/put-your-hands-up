const BASE_URL = `${location.protocol}//${location.host}`;

export const eventsUrl = (id: string): string => {
  return `${BASE_URL}/events/${id}/`;
};
