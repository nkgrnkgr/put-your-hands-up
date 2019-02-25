declare interface Auth {
  uid: string;
  photoURL: string;
  displayName: string;
  isAnonymous: boolean;
}

declare interface Firebase {
  login: Function;
  logout: Function;
  auth: Auth;
}

declare interface Firestore {
  get: Function;
  set?: Function;
  add: Function;
  update: Function;
  delete: Function;
  setListener: Function;
}

declare interface FirestoreDocument {
  exists: boolean;
  id: string;
}