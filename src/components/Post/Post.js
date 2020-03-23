import React from "react";

export default function Posts(props) {
  const post = props.data;
  const { title, content } = post;

  return (
    <div>
      <h2>Title: {title}</h2>
      <p>Content: {content}</p>
    </div>
  );
}
