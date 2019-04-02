import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesService from '../api/moviesService';
import ListAllMovies from '../ListAllMoviesComponent/ListAllMoviesComponent';
import FiltersAside from '../FiltersAsideComponent/FiltersAsideComponent';
import { debounce } from '../helpers/helpers';

const buildGenresString = filters => {
  const activeFilters = filters.filter(filter => filter.active);
  const activeFiltersId = activeFilters.map(filter => filter.id);
  const commaSeparatedIds = activeFiltersId.join(',');
  return commaSeparatedIds;
};

class MainPage extends Component {
  constructor() {
    super();
    this.state = { movies: [], currentPage: 1, hasErrors: false, isLoading: true };
    this.loadMovies = this.loadMovies.bind(this);
  }
  loadMovies() {
    const { filters } = this.props;
    const genresString = buildGenresString(filters);
    this.listMovies.setState({ isLoading: true });
    MoviesService.getMoviesList(this.state.currentPage, genresString)
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
    this.debounceMoviesUpdate = debounce(this.updateFilters, 500);
  }
  render() {
    const { hasErrors } = this.state;
    console.log('main page component');
    console.log(this.props.filters);
    return (
      <div className="flex row">
        <FiltersAside updateFilters={() => 1} />
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

const mapStateToProps = state => ({
  filters: state.filters
});

export default connect(mapStateToProps)(MainPage);
