import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';
import input, { State as inputState } from 'reducers/input';

const rootReducer = combineReducers({
  notes,
  input
});

export interface CombinedState {
  notes: notesState;
  input: inputState;
}

export default rootReducer;
