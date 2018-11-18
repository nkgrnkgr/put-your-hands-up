import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';
import input, { State as inputState } from 'reducers/input';
import { reducer as formReducer, FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  notes,
  input,
  form: formReducer
});

export interface CombinedState {
  notes: notesState;
  input: inputState;
  form: FormReducer;
}

export default rootReducer;
