import React, { Component } from "react";

class Like extends React.Component {
  render() {
    let classFont = "fa fa-heart";
    if (!this.props.like) classFont += "-o";
    return (
      <i
        onClick={this.props.onLike}
        className={classFont}
        style={{ cursor: "pointer" }}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
