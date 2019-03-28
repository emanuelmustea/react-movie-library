import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesService from '../api/moviesService';
import '../ui/ui.css';
import ListAllMovies from '../ListAllMoviesComponent/ListAllMoviesComponent';

class SearchComponent extends Component {
  constructor() {
    super();
    this.state = { currentPage: 1, finished: false };
    this.loadMovies = this.loadMovies.bind(this);
  }
  componentDidMount() {
    this.loadMovies();
  }
  loadMovies() {
    if (this.state.finished) return;
    const { query } = this.props.match.params;
    this.listMovies.setState({ isLoading: true });
    MoviesService.search(query, this.state.currentPage).then(res => {
      const finished = res.length === 0 ? true : false;
      this.listMovies.updateMovies({ movies: res, currentPage: this.state.currentPage });
      this.listMovies.setState({ isLoading: false });
      this.setState({ currentPage: this.state.currentPage + 1, finished });
    });
  }
  render() {
    const { query } = this.props.match.params;
    return (
      <div style={{ padding: 30, paddingTop: 0 }}>
        <h3>
          You searched for: <strong>{query}</strong>
        </h3>
        <ListAllMovies ref={ref => (this.listMovies = ref)} isAtTheBottom={this.loadMovies} movies={this.state.movies} isLoading={this.state.isLoading} />
      </div>
    );
  }
}
export default withRouter(SearchComponent);
