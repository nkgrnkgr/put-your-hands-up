import { combineReducers } from 'redux';
import notes, { State as notesState } from 'reducers/notes';
import tags, { State as tagsState } from 'reducers/tags';
import color, { State as colorState } from 'reducers/color';
import content, { State as contentState } from 'reducers/content';
import { reducer as formReducer, FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  notes,
  tags,
  color,
  content,
  form: formReducer
});

export interface CombinedState {
  notes: notesState;
  tags: tagsState;
  color: colorState;
  content: contentState;
  form: FormReducer;
}

export default rootReducer;
