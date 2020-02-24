import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOnriM6256MwxOif_2uTYxc2eOmRlmsFA",
  authDomain: "fe-masters-firebase-with-react.firebaseapp.com",
  databaseURL: "https://fe-masters-firebase-with-react.firebaseio.com",
  projectId: "fe-masters-firebase-with-react",
  storageBucket: "fe-masters-firebase-with-react.appspot.com",
  messagingSenderId: "530574157707",
  appId: "1:530574157707:web:33b43ca8f5a25f6f5c318e",
  measurementId: "G-RSCG0215RY"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;
