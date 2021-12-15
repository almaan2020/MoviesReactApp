import React from "react";
import joi from "joi-browser";
import Form from "../common/form";

class RegisterFrom extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: joi
      .string()
      .email({ minDomainSegments: 2 })
      .required()
      .label("Username"),
    password: joi.string().min(5).required().label("Password"),
    name: joi.string().required().label("Name"),
  };

  dosubmit = () => {
    //call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterFrom;
