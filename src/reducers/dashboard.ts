import * as Action from 'actions/dashboard';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Event } from 'domain/Event';

export interface State {
  events: Event[];
}

const initialState: State = {
  events: []
};

const reducer = reducerWithInitialState(initialState).case(
  Action.addEvent,
  (state, payload) => {
    const { event } = payload;
    if (event === undefined) {
      return state;
    }
    if (existsTagAlready(state.events, event)) {
      return state;
    }
    return {
      ...state,
      events: [...state.events, event]
    };
  }
);

const existsTagAlready = (events: Event[], event: Event): boolean => {
  return events.some(e => e.id === event.id);
};

export default reducer;
