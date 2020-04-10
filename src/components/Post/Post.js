import React from "react";
import "./Post.css";

export default function Posts(props) {
  const post = props.data;
  const { title, content } = post;

  return (
    <div className="post">
      <h2>Title: {title}</h2>
      <p>Content: {content}</p>
      <button onClick={() => props.handleDelete(post.id)}>Delete</button>
    </div>
  );
}
