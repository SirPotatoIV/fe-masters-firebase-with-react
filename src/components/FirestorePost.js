import React from "react";
import moment from "moment";
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
    const date = moment(this.props.createdAt.toDate()).calendar();

    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <p><strong>Star Count:</strong> {this.props.stars} <strong>Created:</strong> {date}</p>
        <button onClick={this.deletePost}>Delete</button>
        <button onClick={this.addStar}>Add Star</button>
      </div>
    );
  }
}
export default FirestorePost;
