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
const Firebase = firebase.initializeApp(firebaseConfig);

// tables
export const UsersToExercises = firebase.firestore().collection('UsersToExercises');
export const Exercises = firebase.firestore().collection('Exercises');
/*export const dbAttendance = firebase.firestore().collection('practiceAttendance');
export const dbAllPaddlers = firebase.firestore().collection('allPaddlers');
export const dbCrews = firebase.firestore().collection('crews');
export const dbAllTimeTrials = firebase.firestore().collection('TimeTrialsForEveryone');
*/

export default Firebase;