import React from "react";
import { signInWithGoogle, signOut } from "../firebase";

export default function User({ displayName, email }) {
  return (
    <div>
      <h3>User: {displayName} Email: {email}</h3>
      <button onClick={signInWithGoogle}>Sign-in with Google</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
