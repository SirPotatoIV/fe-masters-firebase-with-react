import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUMqLJjfTVb3nFSikWimfpaeTSsEpALuU",
  authDomain: "fir-with-react-7824c.firebaseapp.com",
  databaseURL: "https://fir-with-react-7824c.firebaseio.com",
  projectId: "fir-with-react-7824c",
  storageBucket: "fir-with-react-7824c.appspot.com",
  messagingSenderId: "61547920818",
  appId: "1:61547920818:web:ef164630cffe2cd77c78ab",
  measurementId: "G-9GCM8C7Z6H",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
