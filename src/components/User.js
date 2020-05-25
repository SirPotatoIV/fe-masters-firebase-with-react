import React from "react";

export default function User({ displayName, email }) {
  return (
    <div>
      <h3>User: {displayName} Email: {email}</h3>
    </div>
  );
}
