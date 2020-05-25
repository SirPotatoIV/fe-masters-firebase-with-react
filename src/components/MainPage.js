import React from "react";
import { firestore, auth } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
// import PostCreation from "./PostCreation";
import FirestorePost from "./FirestorePost";
import User from "./User";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      firestorePosts: [],
      user: {
        uid: null,
        displayName: null,
        email: null,
      },
    };
    // Needed because methods are not bound by default in JavaScript
    // -- If you don't bind, using this in the function will not work.
    // -- You can also use the experimental public class fields syntax
    // this.createPost = this.createPost.bind(this);
  }

  // this will be used for cleaning up our code.
  // -- in componentDidMount we will call a function. This function will continue to run if we do not kill it
  // -- ... causing a data leak. Kind of like accidentally creating a bunch of setInterval or setTimeouts and not killing them.
  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const firestorePosts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ firestorePosts: firestorePosts });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      const loggedInUser = user || {
        uid: null,
        displayName: null,
        email: null,
      };
      this.setState({ user: loggedInUser });
    });
  };

  // This is similar to when you clean up junk at the end of the useEffect hook
  // -- In useEffect you return the function to clean it up. In a class component ...
  // ... you use componentWillUnmount.
  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  };

  createFirestorePost = async (post) => {
    // Taking data the user has entered into the input fields and setting new variable equal to it
    const newPostData = {
      title: this.state.title,
      content: this.state.content,
      stars: 0,
      createdAt: new Date(),
      user: {
        displayName: this.state.user.displayName,
        email: this.state.user.email,
        uid: this.state.user.uid,
      },
    };
    // Adding post to Firestore and getting the new posts docRef
    try {
      await firestore.collection("posts").add(newPostData);
    } catch (error) {
      console.log("Error occurred trying to add a post to Firestore: ", error);
    }
  };

  render() {
    return (
      // User Login and information
      <div className="App">
        <div className="user">
          <User
            displayName={this.state.user.displayName}
            email={this.state.user.email}
          />
        </div>

        {/* Create a post */}
        <div className="post-creation">
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
              onChange={({ target }) =>
                this.setState({ content: target.value })
              }
            />
          </label>
          <br></br>
          <button onClick={this.createFirestorePost}>Add to Firestore</button>
        </div>

        {/* User's Posts */}
        <div className="post-container">
          <h2>Posts Stored in Firestore</h2>
          {this.state.firestorePosts.map((post) => (
            <FirestorePost key={post.id} {...post} />
          ))}
        </div>
      </div>
    );
  }
}
export default MainPage;
