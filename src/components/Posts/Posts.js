import React, { useEffect } from "react";

export default function Posts(props) {
  const firestore = props.firebase;

  useEffect(() => {
    const posts = firestore.CollectionReference("posts").get();
    console.log(posts);
  }, []);

  return <div>Test</div>;
}
