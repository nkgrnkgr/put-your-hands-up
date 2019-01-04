import { combineReducers } from 'redux';
import input, { State as inputState } from 'reducers/input';
import application, { State as applicationState } from 'reducers/application';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  application,
  input,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  application: applicationState;
  input: inputState;
  firebase: any;
  firestore: any;
}

export default rootReducer;
