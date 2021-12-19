import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService.js";
import { getGenres } from "../services/genreService.js";
import Pagination from "../common/pagination";
import { paginate } from "../utility/paginate";
import Filtering from "../common/filtering";
import MoviesTable from "./moviesTable.jsx";
import SearchBox from "./searchBox.jsx";
import _ from "lodash";
import { getMovie } from "../services/fakeMovieService.js";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentFilter: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };
  //searchQuery:"" instead null----because in controlled component(SearchBox) shouldn't use null or undefined

  //promise states:   pending --> resolved or rejected
  //const response=await axios.get('https://jsonplaceholder.typicode.com/posts');
  async componentDidMount() {
    const { data } = await getGenres(); //getGenres return a promise (not array)---->but data is array
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    //this.setState({ movies: movies });
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      //throw new Error("");   //for testing when error occurred
    } catch (ex) {
      //Expected(404:not Found,400:bad request) -expected by API--- errors for client and dont need log them
      //display specific error msg:
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");
      //Unexpected(network down,server down,db down,bug)
      //log them and display an error : unexpected errors handle by interceptor in all places
      //  and just when require to check expected error(delete operation) write codes
      //either expected error(up lines) or unexpected error(httpService), we should undo the changes
      this.setState({ movies: originalMovies });
    }
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
    this.setState({ currentFilter: filter, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    //query = e.currentTarget.value    (searchBox.jsx)
    this.setState({ searchQuery: query, currentFilter: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      currentFilter,
      searchQuery,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filterMovies = allMovies;
    if (searchQuery) {
      filterMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (currentFilter && currentFilter._id) {
      filterMovies = allMovies.filter((m) => m.genre._id === currentFilter._id);
    }

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
    const { pageSize, currentPage, currentFilter, searchQuery, sortColumn } =
      this.state;

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
          <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>
          <div>&nbsp;</div>
          <p>showing {totalCount} in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div>&nbsp;</div>
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
