import { combineReducers } from 'redux';
import input, { State as inputState } from 'reducers/input';
import confirm, { State as confirmState } from 'reducers/confirm';
import application, { State as applicationState } from 'reducers/application';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  application,
  input,
  confirm,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  application: applicationState;
  input: inputState;
  confirm: confirmState;
  firebase: any;
  firestore: any;
}

export default rootReducer;
