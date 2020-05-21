import React from "react";
import { firestore } from "../firebase";

class FirestorePost extends React.Component {
  docRef = firestore.doc(`posts/${this.props.id}`);

  deletePost = () => {
    this.docRef.delete();
  };

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <button onClick={this.deletePost}>Delete</button>
      </div>
    );
  }
}
export default FirestorePost;
