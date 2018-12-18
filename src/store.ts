import { compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore'; // <- needed if using firestore
import { firebase } from './firebase';
import { rrfConfig } from './firebase/config';
import root from 'reducers/root';

const store = createStore(
  root,
  compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    process.env.NODE_ENV === 'development' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
);

export default store;
