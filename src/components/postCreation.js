import React from "react";

class PostCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }
  render() {
    return (
      <div>
        <h2>Create a New Post </h2>
        <label htmlFor="postTitle">
          Title of Post
          <input
            id="postTitle"
            type="text"
            placeholder="Title of Post"
            onChange={({ target }) => this.setState({ title: target.value })}
          />
        </label>
        <br></br>
        <label htmlFor="postContent">
          Content of Post
          <input
            id="postContent"
            type="text"
            placeholder="Content of Post"
            onChange={({ target }) => this.setState({ content: target.value })}
          />
        </label>
        <br></br>
        <button>Add Post</button>
      </div>
    );
  }
}
export default PostCreation;
