import { combineReducers } from 'redux';
import confirmModal, {
  State as confirmModalState
} from 'reducers/confirmModal';
import input, { State as inputState } from 'reducers/input';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  confirmModal,
  input,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  confirmModal: confirmModalState;
  input: inputState;
  firebase: any;
  firestore: any;
}

export default rootReducer;
