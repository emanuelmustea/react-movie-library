import React, { Component } from 'react';
import MovieOverview from '../MovieOverviewComponent/MovieOverviewComponent';
import LoadingCards from '../LoadingComponent/LoadingCardsComponent';
import '../ui/ui.css';

const DISTANCE_FROM_BOTTOM = 100;
const isAtTheBottomOfThePage = () => {
  const bodyHeight = document.body.scrollHeight;
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;
  return bodyHeight < scrollPosition + windowHeight + DISTANCE_FROM_BOTTOM;
};
export default class ListAllMovies extends Component {
  constructor() {
    super();
    this.state = { movies: [], isLoading: true, isAtTheEnd: false };
    this.triggerParentIfAtBottom = this.triggerParentIfAtBottom.bind(this);
  }
  updateMovies(movieData) {
    const { movies, currentPage } = movieData;
    if (currentPage === 1) {
      this.setState({ movies: movies });
    } else {
      this.setState({ movies: [...this.state.movies, ...movies] });
    }
  }
  triggerParentIfAtBottom() {
    if (isAtTheBottomOfThePage() && this.state.movies.length > 0) {
      this.props.isAtTheBottom();
    }
  }
  componentDidMount() {
    document.addEventListener('scroll', this.triggerParentIfAtBottom);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.triggerParentIfAtBottom);
  }
  render() {
    const moviesCards = this.state.movies.map((movieData, index) => <MovieOverview key={index} movieData={movieData} className="col five" />);
    return (
      <div className="row" style={{ ...this.props.style }}>
        {moviesCards}
        {this.state.isLoading ? <LoadingCards /> : null}
      </div>
    );
  }
}
