import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesService from '../api/moviesService';
import Carousel from '../carousel/Carousel';
import CastingList from './CastingListComponent';
import Loading from '../LoadingComponent/LoadingComponent';

const imagePathToSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;

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
    if (this.state.hasError) return <h1 className="text-center">We found an error when processing your request</h1>;
    if (!this.state.data) return <Loading />;
    const { title, overview, release_date, genres, poster_path, backdrop_path, tagline, homepage } = this.state.data.general;
    const genresList = genres.map(genre => genre.name).join(',');
    const production_companies = this.state.data.general.production_companies.map((company, index) => (
      <div key={index} className="company">
        {(company.logo_path && <img src={imagePathToSrc(company.logo_path)} />) || company.name}
      </div>
    ));
    return (
      <div className="row" style={{ padding: 30, paddingTop: 0, alignItems: 'flex-start' }}>
        <div className="col three">
          <Carousel
            autoSlide={true}
            slideAfter={3000}
            transitionDuration={1000}
            imgs={[imagePathToSrc(poster_path), imagePathToSrc(backdrop_path), imagePathToSrc(poster_path)]}
            auto
          />
        </div>
        <div className="col grow">
          <div className="card">
            <div className="card-head">
              <button className="margin" onClick={this.props.history.goBack}>
                ⟨ Go back
              </button>
              <button className="margin">Add to watchlist</button>
              {homepage && (
                <a href={homepage} target="_new">
                  <button className="margin">Visit movie homepage</button>
                </a>
              )}
              <h1 className="no-margin">
                <span>{title}</span>
                <span className="grey lighter"> ({formatDate(release_date)})</span>
              </h1>
              <h3 className="no-margin">{tagline}</h3>
              <br />
              <span>
                {genresList} | <strong>{formatDate(release_date, false)}</strong>
              </span>
            </div>
            <div className="card-body">{overview}</div>
            <div className="card-body">
              <CastingList data={this.state.data.credits} />
            </div>
            <div className="card-body company-list">
              <div className="title">
                <strong>Production Companies</strong>
              </div>
              {production_companies}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MoviePage);
