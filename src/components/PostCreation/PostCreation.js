import React, { useState } from "react";

export default function PostCreation(props) {
  const { firestore } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePostCreation = async post => {
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
      <input type="text" id="content"></input>
      <button type="button">Create Post</button>
    </div>
  );
}
