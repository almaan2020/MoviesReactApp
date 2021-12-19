import React, { Component } from "react";
import joi from "joi-browser";
import Form from "../common/form";
import { getMovie, saveMovie } from "../services/movieService.js";
import { getGenres } from "../services/genreService.js";

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

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  //****refactoring componentDidMount****
  // async populateGenres() {
  //   const { data: genres } = await getGenres();
  //   this.setState({ genres });
  // }

  // async populateMovie() {
  //   try {
  //     const movieId = this.props.match.params.id;
  //     if (movieId === "new") return;

  //     const { data: movie } = await getMovie(movieId);
  //     this.setState({ data: this.mapToViewModel(movie) });
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404)
  //       this.props.history.replace("/not-found");
  //   }
  // }

  // async componentDidMount() {
  //   await this.populateGenres();
  //   await this.populateMovie();
  // }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  dosubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  // handleAdd=async () =>{
  //   const obj={title:'a',body:'b'};
  //   const {data : post} = await axios.post(apiEndpoint,obj);

  //   const posts=[post, ...this.state.posts];
  //   setState({posts})
  //   }
  //   //browser =>network => response{data,status}

  //   handleUpdate=async post=>{
  //     post.title="UPDATED";
  //   await axios.put(apiEndpoint+"/"+post.id , post);
  //   //axios.patch(apiEndpoint+"/"+post.id , {title : post.title});

  //    const posts = [...this.state.posts];

  //      const index = posts.indexOf(post);

  //      posts[index] = { ...post };

  //    this.setState({ posts });
  //   }

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
