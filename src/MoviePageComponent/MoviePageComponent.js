import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesService from '../api/moviesService';
import Carousel from '../carousel/Carousel';

const movieSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;

const formatDate = (givenDate, onlyYear = true) => {
  const d = new Date(givenDate);
  const month = d.toLocaleString('en', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  return onlyYear ? year : `${month} ${day}, ${year}`;
};

class MoviePage extends Component {
  constructor() {
    super();
    this.state = { data: null, hasError: false };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    MoviesService.getMovieData(id)
      .then(res => this.setState({ data: res }))
      .catch(() => this.setState({ hasError: true }));
  }
  render() {
    if (this.state.hasError) return <div>we found an error</div>;
    if (!this.state.data) return <div>still loading post</div>;
    console.log(this.state.data);
    const { title, overview, release_date, genre_ids, poster_path, backdrop_path } = this.state.data;
    return (
      <div className="row" style={{ padding: 30, paddingTop: 0 }}>
        <div className="col three">
          <Carousel
            autoSlide={true}
            slideAfter={3000}
            transitionDuration={1000}
            imgs={[movieSrc(poster_path), movieSrc(backdrop_path), movieSrc(poster_path)]}
            auto
          />
        </div>
        <div className="col grow">
          <div className="card">
            <div className="card-head">
              <button onClick={this.props.history.goBack}>⟨ Go back</button>
              <h1>
                <span>{title}</span>
                <span className="grey lighter"> ({formatDate(release_date)})</span>
              </h1>
              <span>
                {genre_ids.join(',')} | {formatDate(release_date, false)}
              </span>
            </div>
            <div className="card-body">{overview}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MoviePage);
