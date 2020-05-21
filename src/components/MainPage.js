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

  // this will be used for cleaning up our code.
  // -- in componentDidMount we will call a function. This function will continue to run if we do not kill it
  // -- ... causing a data leak. Kind of like accidentally creating a bunch of setInterval or setTimeouts and not killing them.
  unsubscribe = null;

  componentDidMount = () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const firestorePosts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ firestorePosts: firestorePosts });
    });
  };

  // This is similar to when you clean up junk at the end of the useEffect hook
  // -- In useEffect you return the function to clean it up. In a class component ...
  // ... you use componentWillUnmount.
  componentWillUnmount = () => {
    this.unsubscribe();
  };

  createFirestorePost = async (post) => {
    // Taking data the user has entered into the input fields and setting new variable equal to it
    const newPostData = {
      title: this.state.title,
      content: this.state.content,
      stars: 0,
    };
    // Adding post to Firestore and getting the new posts docRef
    try {
      await firestore.collection("posts").add(newPostData);
    } catch (error) {
      console.log("Error occurred trying to add a post to Firestore: ", error);
    }
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
            stars={post.stars}
          />
        ))}
      </div>
    );
  }
}
export default MainPage;
