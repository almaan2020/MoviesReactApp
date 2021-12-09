import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Pagination from "../common/pagination";
import { paginate } from "../utility/paginate";
import Filtering from "../common/filtering";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
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

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      currentFilter,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filterMovies =
      currentFilter && currentFilter._id
        ? allMovies.filter((m) => m.genre._id === currentFilter._id)
        : allMovies;

    const sorted = _.orderBy(
      filterMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    let movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filterMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, currentFilter, sortColumn } = this.state;

    if (count === 0) return <p>database is empty.</p>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <p>showing {totalCount} in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            pageSize={pageSize}
            itemCounts={totalCount}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
