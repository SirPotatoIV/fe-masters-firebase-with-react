import React, { useState, useEffect } from "react";
import "./App.css";
import { firestore } from "./firebase";
import Post from "./components/Post";
import PostCreation from "./components/PostCreation";

function App() {
  // used for storing all the posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getFirestoreData() {
      try {
        // gets a reference to a snapshot in time from the firestore database. This is specifically looking at the collection called posts
        const snapshot = await firestore.collection("posts").get();

        // takes all the docs from the specific snapshot and puts them into an array called newPosts
        const newPosts = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        // sets the state of posts to newPosts
        setPosts(newPosts);
      } catch (error) {
        console.log("this error occurred: ", error);
      }
    }
    getFirestoreData();
  }, []);

  async function handleDelete() {}

  return (
    <div className="App">
      <h1>Create a Post</h1>
      <PostCreation firestore={firestore} />
      <h1>All the Firestore Posts</h1>
      <div>
        {posts.map((post) => (
          <Post data={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
