import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };
