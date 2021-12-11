import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Counter from './components/counter';
import Movies from './components/movies';
import Navbar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Posts from './components/posts';
import movieFrom from './components/movieFrom';
import NotFound from './components/notFound';
import './App.css';

function App() {
  return (
    <main className="container">
      <Navbar />
      <div className="row">&nbsp;</div>

      <Switch>
        <Route path="/movies/:id" component={movieFrom} />
        <Route path="/customers" render={(props) => <Customers title='Customers' {...props} />} />
        <Route path="/rentals" component={Rentals} />
        <Redirect from="/renta" to="rentals" />
        <Route path="/posts/:year?/:month?" component={Posts} />
        <Route path="/movies" component={Movies} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/" exact component={Movies} />
        <Redirect to="/not-found" />
      </Switch>

    </main>
  );
}

export default App;
