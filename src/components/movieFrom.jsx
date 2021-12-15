import React, { Component } from "react";
import joi from "joi-browser";
import Form from "../common/form";
import { getMovie, saveMovie } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: joi.string(),
    title: joi.string().required().label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi
      .number()
      .min(0)
      .max(100)
      .integer()
      .required()
      .label("Number in Stock"),
    dailyRentalRate: joi.number().min(0).max(10).required().label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found"); //return used for ingoring last line

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  dosubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <h1>Movie Form - id= {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {/* <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              onChange={this.handleChange}
              name="genreId"
              id="genreId"
              className="form-control"
            >
              {getGenres().map((g) => (
                <option value={g._id}>{g.name}</option>
              ))}
            </select>
          </div> */}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
