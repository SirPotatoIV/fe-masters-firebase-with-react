import React from "react";
import "./App.css";
import { firestore } from "./firebase";
import Posts from "./components/Posts";

function App() {
  console.log(firestore.collection("posts").get());
  return <div className="App">{/* <Posts firebase={firestore} /> */}</div>;
}

export default App;
