import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Counter from './components/counter';
import Movies from './components/movies';
import Navbar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Posts from './components/posts';
import MovieForm from './components/movieForm';
import NotFound from './components/notFound';
import LoginForm from './common/loginForm';
import RegisterForm from './components/registerForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <main className="container">
      <ToastContainer />
      <Navbar />
      <div className="row">&nbsp;</div>

      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/customers" render={(props) => <Customers title='Customers' {...props} />} />
        <Route path="/rentals" component={Rentals} />
        <Redirect from="/renta" to="rentals" />
        <Route path="/posts/:year?/:month?" component={Posts} />
        <Route path="/movies" component={Movies} />
        <Route path="/movies/new" component={MovieForm} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Movies} />
        <Redirect to="/not-found" />
      </Switch>

    </main>
  );
}

export default App;
