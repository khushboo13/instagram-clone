/* eslint-disable import/no-extraneous-dependencies */
import Firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCbTh-kn1iwa9BqKkvJZnAGuUVfuz2K3JY',
  authDomain: 'instgram-73446.firebaseapp.com',
  projectId: 'instgram-73446',
  storageBucket: 'instgram-73446.appspot.com',
  messagingSenderId: '1052969123229',
  appId: '1:1052969123229:web:203d1e3e550a78e837c374'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
