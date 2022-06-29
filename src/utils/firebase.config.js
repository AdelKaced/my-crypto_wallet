import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from '@firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBlrqwygwGJffu6kwrcBatH1IT19nkUoaI',
  authDomain: 'my-crypto-wallet-a952f.firebaseapp.com',
  projectId: 'my-crypto-wallet-a952f',
  storageBucket: 'my-crypto-wallet-a952f.appspot.com',
  messagingSenderId: '426519046719',
  appId: '1:426519046719:web:e7e428b2e140336646e68a',
  measurementId: 'G-JL9NECFK7S',
});

export const auth = app.auth();
export const db = getFirestore();
export default app;
