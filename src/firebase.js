// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqPJWYAQ0QjcK-c7v4XbcJ5W8tQ3Kj4iw",
  authDomain: "chat-application-75af3.firebaseapp.com",
  projectId: "chat-application-75af3",
  storageBucket: "chat-application-75af3.appspot.com",
  messagingSenderId: "971652664278",
  appId: "1:971652664278:web:6f8facce9e03c6fc963277"
};

// Initialize Firebase
const firebaseapp=firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider();
export{db,auth,provider};