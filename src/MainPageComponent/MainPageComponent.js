import React, { Component } from 'react';
import MoviesService from '../api/moviesService';
import ListAllMovies from '../ListAllMovies/ListAllMovies';
import FiltersAside from '../filters-aside/filters-aside';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = { movies: [], currentPage: 1, filters: [], hasErrors: false, isLoading: true };
    this.toggleGenre = this.toggleGenreInFilters.bind(this);
    this.loadMovies = this.loadMovies.bind(this);
  }
  loadMovies() {
    const limit = 20;
    const genresString = this.state.filters.join(',');
    this.listMovies.setState({ isLoading: true });
    MoviesService.getMoviesList(this.state.currentPage, limit, genresString)
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
  toggleGenreInFilters(genre) {
    const { filters } = this.state;
    const indexOfGenre = filters.indexOf(genre);
    if (indexOfGenre === -1) {
      filters.push(genre);
    } else {
      filters.splice(indexOfGenre, 1);
    }
    this.setState({ filters, currentPage: 1, movies: [] });
    this.loadMovies();
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
