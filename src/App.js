import React, { Component } from 'react';
import './style.css';
import ListAllMovies from './list-all-movies/list-all-movies';
import Header from './ui/Header';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <ListAllMovies />
        <Header />
      </div>
    );
  }
}
