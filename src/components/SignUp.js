import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <h3>Sign-Up with E-mail</h3>
        <label>
          Email Address
          <input />
        </label>
        <label>
          Password
          <input />
        </label>
      </div>
    );
  }
}
export default SignUp;
