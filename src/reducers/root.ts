import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';

const rootReducer = combineReducers({
  notes
});

export interface CombinedState {
  notes: notesState;
}

export default rootReducer;
