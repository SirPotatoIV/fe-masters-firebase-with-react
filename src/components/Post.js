import React from "react";

class Post extends React.Component {
  render() {
    const title = this.props.title;
    const content = this.props.content;

    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  }
}
export default Post;
