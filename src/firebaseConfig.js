// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-SZM1Nmm6DRxUqGnx3BbWCGR-eahCmOo",
  authDomain: "quiz-auth-ced5b.firebaseapp.com",
  projectId: "quiz-auth-ced5b",
  storageBucket: "quiz-auth-ced5b.appspot.com",
  messagingSenderId: "631074481203",
  appId: "1:631074481203:web:a36cf8e35c908f9a072f46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
