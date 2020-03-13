import React, { useEffect } from "react";

export default function Posts(props) {
  const firestore = props.firebase;

  useEffect(() => {
    console.log("useEffect occurred");
  }, []);

  return <div>Test</div>;
}
