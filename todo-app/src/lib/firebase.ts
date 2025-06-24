import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // You'll need to replace these with your actual Firebase config values
  apiKey: "AIzaSyABe4EWJIpMb4vnXCRxXyL4rcE1aY2HVGM",
  authDomain: "athena-pools-scheduler.firebaseapp.com",
  projectId: "athena-pools-scheduler",
  storageBucket: "athena-pools-scheduler.firebasestorage.app",
  messagingSenderId: "308689611949",
  appId: "1:308689611949:web:8337fdda6e4263167d6a24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyABe4EWJIpMb4vnXCRxXyL4rcE1aY2HVGM",
//   authDomain: "athena-pools-scheduler.firebaseapp.com",
//   projectId: "athena-pools-scheduler",
//   storageBucket: "athena-pools-scheduler.firebasestorage.app",
//   messagingSenderId: "308689611949",
//   appId: "1:308689611949:web:8337fdda6e4263167d6a24"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
