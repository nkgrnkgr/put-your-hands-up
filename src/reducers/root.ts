import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';
import tags, { State as tagsState } from 'reducers/tags';
import { reducer as formReducer, FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  notes,
  tags,
  form: formReducer
});

export interface CombinedState {
  notes: notesState;
  tags: tagsState;
  form: FormReducer;
}

export default rootReducer;
