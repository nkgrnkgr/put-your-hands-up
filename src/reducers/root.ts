import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';
import { reducer as formReducer, FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  notes,
  form: formReducer
});

export interface CombinedState {
  notes: notesState;
  form: FormReducer;
}

export default rootReducer;
