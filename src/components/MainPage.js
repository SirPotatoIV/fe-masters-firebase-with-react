import React from "react";
// import PostCreation from "./PostCreation";
import Post from "./Post";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      posts: [],
    };
    // Needed because methods are not bound by default in JavaScript
    // -- If you don't bind, using this in the function will not work.
    // -- You can also use the experimental public class fields syntax
    this.createPost = this.createPost.bind(this);
  }

  createPost() {
    const updatedPosts = [
      ...this.state.posts,
      { title: this.state.title, content: this.state.content },
    ];

    this.setState({
      posts: updatedPosts,
    });
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
        <button onClick={this.createPost}>Add Post</button>
        {this.state.posts.map((post) => (
          <Post key={post.title} title={post.title} content={post.content} />
        ))}
      </div>
    );
  }
}
export default MainPage;
