import React, { Component } from "react";

class MovieFrom extends React.Component {
  //prevent access backward : use "replace" instead of "push"
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieFrom;
