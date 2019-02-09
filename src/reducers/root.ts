import { combineReducers } from 'redux';
import input, { State as inputState } from 'reducers/input';
import confirm, { State as confirmState } from 'reducers/confirm';
import search, { State as searchState } from 'reducers/search';
import sort, { State as sortState } from 'reducers/sort';
import comment, { State as commentState } from 'reducers/comment';
import application, { State as applicationState } from 'reducers/application';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  application,
  input,
  confirm,
  search,
  sort,
  comment,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  application: applicationState;
  input: inputState;
  confirm: confirmState;
  search: searchState;
  sort: sortState;
  comment: commentState;
  firebase: Firebase;
  firestore: Firestore;
}

export default rootReducer;
