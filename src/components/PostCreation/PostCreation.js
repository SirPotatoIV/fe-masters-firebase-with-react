import React, { useState } from "react";

export default function PostCreation(props) {
  // passing firestore through props
  const { firestore } = props;
  // store title for post
  const [title, setTitle] = useState("");
  // store content for post
  const [content, setContent] = useState("");

  // function to adding a post to the firestore database when the button is clicked
  const handlePostCreation = async () => {
    // take title and content for post and store in an object
    const post = { title, content };
    // adds post to firestore database
    const docRef = await firestore.collection("posts").add(post);
    console.log(docRef);
  };

  // Reference to why I used htmlFor instead of for https://stackoverflow.com/questions/22752116/react-ignores-for-attribute-of-the-label-element
  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      ></input>

      <br></br>

      <label htmlFor="content">Content:</label>
      <input
        type="text"
        id="content"
        onChange={({ target }) => {
          setContent(target.value);
        }}
      ></input>

      <br></br>

      <button type="button" onClick={handlePostCreation}>
        Create Post
      </button>
    </div>
  );
}
