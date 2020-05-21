import React from "react";
// import PostCreation from "./PostCreation";
import Post from "./Post";
import { firestore } from "../firebase";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      posts: [
        { title: "Example Post 1", content: " This is example 1." },
        { title: "Example Post 2", content: "This is example 2." },
      ],
    };
    // Needed because methods are not bound by default in JavaScript
    // -- If you don't bind, using this in the function will not work.
    // -- You can also use the experimental public class fields syntax
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount = async () => {
    try {
      const snapshot = await firestore.collection("posts").get();

      snapshot.forEach(function (doc) {
        const id = doc.id;
        const data = doc.data();
        console.log({ doc });
        console.log({ id, data });
      });
    } catch (err) {
      console.log(err);
    }
  };

  createPost() {
    const updatedPosts = [
      ...this.state.posts,
      { title: this.state.title, content: this.state.content },
    ];

    this.setState({
      posts: updatedPosts,
    });
  }

  deletePost = (index) => {
    const postIndex = index;
    let updatedPosts = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      if (i !== postIndex) {
        updatedPosts.push(this.state.posts[i]);
      }
    }
    this.setState({
      posts: updatedPosts,
    });
  };

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
        {this.state.posts.map((post, index) => (
          <div key={post.title}>
            <Post title={post.title} content={post.content} />
            <button
              onClick={() => {
                this.deletePost(index);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}
export default MainPage;
