import { Event } from 'domain/Event';
import { actionCreatorFactory } from 'typescript-fsa';

export interface DashboardActionPayload {
  event: Event;
}

const actionCreater = actionCreatorFactory();

export const addEvent = actionCreater<DashboardActionPayload>(
  'DASH_BOARD_ADDEVENT'
);
