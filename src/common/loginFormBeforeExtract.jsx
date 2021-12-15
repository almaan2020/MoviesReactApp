import React, { Component } from "react";

class LoginFormBeforeExtract extends React.Component {
  /*****ref way for access to elements: */
  //1-  in this line   :  username = React.createRef();
  // 2- in handlesubmit :   const username = this.username.current.value;
  // 3- in render  :   add  ref={this.username} to username input
  //4- in this line "  componentDidMount() {
  //                     this.username.current.focus();
  //                    }

  //*****controlled component way */
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //call the server
    console.log("Submitted");
  };

  // handleChange = (e) => {
  //   const account = { ...this.state.account };
  //   account[e.currentTarget.name] = e.currentTarget.value; //instead account.username,read dynamically by []
  //   this.setState({ account });
  // };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              autoFocus
              value={account.username}
              onChange={this.handleChange}
              name="username"
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginFormBeforeExtract;
