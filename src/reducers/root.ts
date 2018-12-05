import { combineReducers } from 'redux';
import confirmModal, {
  State as confirmModalState
} from 'reducers/confirmModal';
import notes, { State as notesState } from 'reducers/notes';
import input, { State as inputState } from 'reducers/input';

const rootReducer = combineReducers({
  confirmModal,
  notes,
  input
});

export interface CombinedState {
  confirmModal: confirmModalState;
  notes: notesState;
  input: inputState;
}

export default rootReducer;
