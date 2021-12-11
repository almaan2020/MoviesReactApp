import React, { Component } from "react";
import queryString from "query-string";
import { Route, Link } from "react-router-dom";
import Counter from "./counter";

class Post extends React.Component {
  render() {
    const { match, location } = this.props;
    const { sortedBy } = queryString.parse(location.search);
    return (
      <div>
        year:{match.params.year} and month: {match.params.month}
        <br></br>
        sorted by : {sortedBy}
        <br></br>
        <Link to="/posts/counter"> Nested Routing </Link>
        <Route path="/posts/counter" component={Counter} />
      </div>
    );
  }
}

export default Post;
