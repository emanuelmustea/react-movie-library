import React, { Component } from 'react';
import MoviesService from '../api/moviesService';
import ListAllMovies from '../ListAllMoviesComponent/ListAllMoviesComponent';
import FiltersAside from '../FiltersAsideComponent/FiltersAsideComponent';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = { movies: [], currentPage: 1, hasErrors: false, isLoading: true };
    this.loadMovies = this.loadMovies.bind(this);
  }
  loadMovies() {
    const limit = 20;
    this.listMovies.setState({ isLoading: true });
    MoviesService.getMoviesList(this.state.currentPage, limit)
      .then(res => {
        const movies = [...this.state.movies, ...res];
        this.listMovies.updateMovies({ movies, currentPage: this.state.currentPage });
        this.listMovies.setState({ isLoading: false });
        this.setState(oldState => ({
          movies,
          currentPage: oldState.currentPage + 1,
          hasErrors: false
        }));
      })
      .catch(() => {
        this.setState({ hasErrors: true });
        this.listMovies.setState({ isLoading: false });
      });
  }
  componentDidMount() {
    this.loadMovies();
  }
  render() {
    const { hasErrors } = this.state;
    return (
      <div className="flex row">
        <FiltersAside toggleGenre={genre => this.toggleGenreInFilters(genre)} />
        <ListAllMovies
          style={{ padding: 30, paddingTop: 0 }}
          ref={ref => (this.listMovies = ref)}
          isAtTheBottom={this.loadMovies}
          movies={this.state.movies}
          isLoading={this.state.isLoading}
        />
        {hasErrors && (
          <div className="alert danger">
            <div>Couldn&apos;t load movies. Make sure you have an active data connection</div>
          </div>
        )}
      </div>
    );
  }
}
