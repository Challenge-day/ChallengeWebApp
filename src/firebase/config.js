import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAW3r7-siY4uER9zX4okaRwPVZIlOjq0U8',
	authDomain: 'challenge-33548.firebaseapp.com',
	projectId: 'challenge-33548',
	storageBucket: 'challenge-33548.appspot.com',
	messagingSenderId: '516447880698',
	appId: '1:516447880698:web:caa1af6cd8bdf8df53d043',
	measurementId: 'G-TTZYPSZPNQ',
	databaseURL: 'https://challenge-33548-default-rtdb.firebaseio.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize firebase database and get the reference of firebase database object.
const database = getDatabase(app);

const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider, database };
