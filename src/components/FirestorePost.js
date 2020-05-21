import React from "react";
import { firestore } from "../firebase";

class FirestorePost extends React.Component {
  postRef = firestore.doc(`posts/${this.props.id}`);

  deletePost = () => {
    this.postRef.delete();
  };

  addStar = async () => {
    const updatedStarCount = this.props.stars + 1;

    this.postRef.update({
      stars: updatedStarCount,
    });
  };

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <p>Star Count: {this.props.stars}</p>
        <button onClick={this.deletePost}>Delete</button>
        <button onClick={this.addStar}>Add Star</button>
      </div>
    );
  }
}
export default FirestorePost;
