import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    // your config (get it from firebase config)
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth}
