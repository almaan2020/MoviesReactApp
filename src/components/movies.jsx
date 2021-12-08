import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import Like from "../common/like";

class Movies extends React.Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

   handleLike = (movie) => {
    const movies = [...this.state.movies]; //clone
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //clone
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  
  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) return <p>database is empty.</p>;

    return (
      <React.Fragment>
        <p>showing {movieCount} in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onLike={() => this.handleLike(movie)}
                    like={movie.like}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
