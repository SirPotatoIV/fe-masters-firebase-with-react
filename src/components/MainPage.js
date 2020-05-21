import React from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
// import PostCreation from "./PostCreation";
import Post from "./Post";
import FirestorePost from "./FirestorePost";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      localPosts: [
        { title: "Example Post 1", content: " This is example 1." },
        { title: "Example Post 2", content: "This is example 2." },
      ],
      firestorePosts: [],
    };
    // Needed because methods are not bound by default in JavaScript
    // -- If you don't bind, using this in the function will not work.
    // -- You can also use the experimental public class fields syntax
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount = async () => {
    try {
      const snapshot = await firestore.collection("posts").get();

      const firestorePosts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({
        firestorePosts: firestorePosts,
      });
    } catch (err) {
      console.log(err);
    }
  };

  createFirestorePost = async (post) => {
    // Taking data the user has entered into the input fields and setting new variable equal to it
    const newPostData = {
      title: this.state.title,
      content: this.state.content,
    };
    // Adding post to Firestore and getting the new posts docRef
    const docRef = await firestore.collection("posts").add(newPostData);
    // Getting the post we just created from Firestore
    // This part isn't really necessary. The instructor was just showing how to get a single doc
    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);
    this.setState({ firestorePosts: [newPost, ...this.state.firestorePosts] });
  };

  createPost() {
    const updatedPosts = [
      ...this.state.localPosts,
      { title: this.state.title, content: this.state.content },
    ];

    this.setState({
      localPosts: updatedPosts,
    });
  }

  deletePost = (index) => {
    // This is passed in by the button being clicked. It is index of the post in the array
    const postIndex = index;
    // used to store all the posts we want to save
    let updatedPosts = [];
    // go through the posts and only save the ones we want to keep
    // -- in deleteFirestorePosts I used a filter method which is cleaner looking.
    // -- This is essentially the same thing, but filter is kinda easier.
    for (let i = 0; i < this.state.posts.length; i++) {
      if (i !== postIndex) {
        updatedPosts.push(this.state.localPosts[i]);
      }
    }
    // Change the localPosts to only contain the updatedPosts
    this.setState({
      localPosts: updatedPosts,
    });
  };

  deleteFirestorePost = async (id) => {
    // remove from Firestore
    firestore.doc(`posts/${id}`).delete();
    // store all the current fireStorePosts in state
    const allFirestorePosts = this.state.firestorePosts;
    // filter the posts so that the post we want to delete is removed
    const updatedFirestorePosts = allFirestorePosts.filter(
      (post) => post.id !== id
    );
    // set the state of the firestorePosts to the updatedFirestorePosts
    this.setState({ firestorePosts: updatedFirestorePosts });
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
        <button onClick={this.createPost}>Add to Local</button>
        <button onClick={this.createFirestorePost}>Add to Firestore</button>
        <h1>Original Posts Stored Locally</h1>
        {this.state.localPosts.map((post, index) => (
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
        <h1>Posts Stored in Firestore</h1>
        {this.state.firestorePosts.map((post) => (
          <FirestorePost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            delete={this.deleteFirestorePost}
          />
        ))}
      </div>
    );
  }
}
export default MainPage;
