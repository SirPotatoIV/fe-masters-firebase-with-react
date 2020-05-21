import React from "react";

class FirestorePost extends React.Component {
  // deletePost = () => {
  //   console.log(`DELETE POST ${this.props.title}`);
  // };

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
        <button onClick={() => this.props.delete(this.props.id)}>Delete</button>
      </div>
    );
  }
}
export default FirestorePost;
