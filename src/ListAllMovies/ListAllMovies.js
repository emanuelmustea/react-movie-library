import React, { Component } from 'react';
import MovieOverview from '../movie/movie-overview';
import Loading from '../loading/Loading';
import '../ui/ui.css';

export default class ListAllMovies extends Component {
  constructor() {
    super();
    this.state = { movies: [], isLoading: true, isAtTheEnd: false };
    this.loadMoviesIfAtTheBottom = this.loadMoviesIfAtTheBottom.bind(this);
  }
  isAtTheBottomOfThePage() {
    const bodyHeight = document.body.scrollHeight;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    return bodyHeight < scrollPosition + windowHeight + 100;
  }

  updateMovies(state) {
    const { movies, currentPage } = state;
    if (currentPage == 1) {
      this.setState({ movies: movies });
    } else {
      this.setState({ movies: [...this.state.movies, ...movies] });
    }
  }

  loadMoviesIfAtTheBottom() {
    if (this.isAtTheBottomOfThePage() && this.state.movies.length > 0) {
      this.props.isAtTheBottom();
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', this.loadMoviesIfAtTheBottom);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoviesIfAtTheBottom);
  }
  render() {
    const moviesCards = this.state.movies.map((movieData, index) => <MovieOverview key={index} movieData={movieData} className="col five" />);
    return (
      <div className="row" style={{ ...this.props.style }}>
        {moviesCards}
        {this.state.isLoading ? <Loading type="card" /> : null}
      </div>
    );
  }
}
