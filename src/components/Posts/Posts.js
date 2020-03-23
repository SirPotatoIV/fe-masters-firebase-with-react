import React from "react";

export default function Posts(props) {
  const post = props.data[0];
  const { title, content } = post;

  return (
    <div>
      <h1>Title: {title}</h1>
      <p>Content: {content}</p>
    </div>
  );
}
