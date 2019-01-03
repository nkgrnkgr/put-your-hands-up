import { combineReducers } from 'redux';
import confirmModal, {
  State as confirmModalState
} from 'reducers/confirmModal';
import input, { State as inputState } from 'reducers/input';
import application, { State as applicationState } from 'reducers/application';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  confirmModal,
  input,
  application,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  confirmModal: confirmModalState;
  input: inputState;
  application: applicationState;
  firebase: any;
  firestore: any;
}

export default rootReducer;
