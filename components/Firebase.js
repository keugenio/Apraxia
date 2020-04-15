import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseKey from './keys/firebaseKey';


const firebaseConfig = {
  apiKey: firebaseKey.apiKey,
  authDomain: firebaseKey.authDomain,
  databaseURL: firebaseKey.databaseURL,
  projectId: firebaseKey.projectId,
  storageBucket: firebaseKey.storageBucket,
  messagingSenderId: firebaseKey.messagingSenderId,
  appId: firebaseKey.appId,
  measurementId: firebaseKey.measurementId
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const dB = firebase.database();

// tables
/* export const dbRaces = firebase.firestore().collection('races');
export const dbRacesToPaddlers = firebase.firestore().collection('racesToPaddlers');
export const dbAttendance = firebase.firestore().collection('practiceAttendance');
export const dbAllPaddlers = firebase.firestore().collection('allPaddlers');
export const dbCrews = firebase.firestore().collection('crews');
export const dbAllTimeTrials = firebase.firestore().collection('TimeTrialsForEveryone');
*/

export default firebase;
