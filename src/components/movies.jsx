import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Like from "../common/like";
import Pagination from "../common/pagination";
import { paginate } from "../utility/paginate";
import Filtering from "../common/filtering";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    //this.setState({ movies: movies });
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; //clone
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] }; //clone
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }); //cause new rendering movies and its children(such as pagination)
  };

  handleChangeFilter = (filter) => {
    this.setState({ currentFilter: filter, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      currentFilter,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>database is empty.</p>;

    const filterMovies =
      currentFilter && currentFilter._id
        ? allMovies.filter((m) => m.genre._id === currentFilter._id)
        : allMovies;

    let movies = paginate(filterMovies, currentPage, pageSize); //local movies (not this.state.movies)

    return (
      <div className="row">
        <div className="col-3">
          <Filtering
            filters={this.state.genres}
            // filtersTextProperty="name"
            // filtersValueProperty="_id"
            currentFilter={currentFilter}
            onChangeFilter={this.handleChangeFilter}
          />
        </div>
        <div className="col-9">
          <p>showing {filterMovies.length} in the database</p>
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
              {
                //map on local movies
                movies.map((movie) => (
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
                ))
              }
            </tbody>
          </table>
          <Pagination
            pageSize={pageSize}
            itemCounts={filterMovies.length}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
