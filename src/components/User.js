import React from "react";

export default function User({ displayName, email }) {
  return (
    <div>
      <h3>User: {displayName}</h3>
      <p>Email: {email}</p>
    </div>
  );
}
