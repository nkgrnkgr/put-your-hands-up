import { combineReducers } from 'redux';
import confirm, { State as confirmState } from 'reducers/confirm';
import search, { State as searchState } from 'reducers/search';
import sort, { State as sortState } from 'reducers/sort';
import comment, { State as commentState } from 'reducers/comment';
import userSetting, { State as userSettingState } from 'reducers/userSetting';
import application, { State as applicationState } from 'reducers/application';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  application,
  confirm,
  search,
  sort,
  comment,
  userSetting,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export interface CombinedState {
  application: applicationState;
  confirm: confirmState;
  search: searchState;
  sort: sortState;
  comment: commentState;
  userSetting: userSettingState;
  firebase: Firebase;
  firestore: Firestore;
}

export default rootReducer;
