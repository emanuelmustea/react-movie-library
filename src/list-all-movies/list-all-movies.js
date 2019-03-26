import React, { Component } from 'react';
import MoviesApi from '../api/movies';
import MovieOverview from '../movie/movie-overview';
import Loading from '../loading/Loading';
import FiltersAside from '../filters-aside/filters-aside';
import '../ui/ui.css';

export default class ListAllMovies extends Component {
  constructor() {
    super();
    this.state = { movies: [], currentPage: 1, filters: [], hasErrors: false, isLoading: true };
    this.MoviesApi = new MoviesApi();
    this.toggleGenre = this.toggleGenreInFilters.bind(this);
    this.loadMoviesIfAtTheBottom = this.loadMoviesIfAtTheBottom.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }
  loadMoreMovies(limit = 20) {
    const genresString = this.state.filters.join(',');
    this.setState({ isLoading: true });
    this.MoviesApi.getMoviesList(this.state.currentPage, limit, genresString)
      .then(res => {
        const movies = [...this.state.movies, ...res];
        this.setState(oldState => ({
          movies,
          currentPage: oldState.currentPage + 1,
          hasErrors: false,
          isLoading: false
        }));
      })
      .catch(() => this.setState({ hasErrors: true, isLoading: false }));
  }
  toggleGenreInFilters(genre) {
    const { filters } = this.state;
    const indexOfGenre = filters.indexOf(genre);
    if (indexOfGenre === -1) {
      filters.push(genre);
    } else {
      filters.splice(indexOfGenre, 1);
    }
    this.setState({ filters });
  }
  applyFilters() {
    this.setState({ currentPage: 1, movies: [] });
    this.loadMoreMovies();
  }
  isAtTheBottomOfThePage() {
    const bodyHeight = document.body.scrollHeight;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    return bodyHeight < scrollPosition + windowHeight + 100;
  }
  loadMoviesIfAtTheBottom() {
    if (this.isAtTheBottomOfThePage() && this.state.movies.length > 0) {
      this.loadMoreMovies();
    }
  }
  componentDidMount() {
    this.loadMoreMovies();
    document.addEventListener('scroll', this.loadMoviesIfAtTheBottom);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoviesIfAtTheBottom);
  }
  render() {
    const moviesCards = this.state.movies.map((movieData, index) => <MovieOverview key={index} movieData={movieData} className="col five" />);
    const { hasErrors } = this.state;
    return (
      <div className="flex row">
        <FiltersAside applyFilters={this.applyFilters} toggleGenre={genre => this.toggleGenreInFilters(genre)} />
        <div className="row" style={{ padding: 30, paddingTop: 100 }}>
          {moviesCards}
          {this.state.isLoading ? <Loading type="card" /> : null}
          {hasErrors && (
            <div className="alert danger">
              <div>Couldn't load movies. Make sure you have an active data connection</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
