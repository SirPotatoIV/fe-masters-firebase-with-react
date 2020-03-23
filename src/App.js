import React from "react";
import "./App.css";
import { firestore } from "./firebase";
import Posts from "./components/Posts";

function App() {
  async function getFirestoreData() {
    try {
      const snapshot = await firestore.collection("posts").get();
      console.log(snapshot);

      snapshot.forEach(doc => {
        const id = doc.id;
        const data = doc.data();

        console.log({ id, data });
      });
    } catch (error) {
      console.log("this error occurred: ", error);
    }
  }
  getFirestoreData();

  console.log();
  return <div className="App">{/* <Posts firebase={firestore} /> */}</div>;
}

export default App;
