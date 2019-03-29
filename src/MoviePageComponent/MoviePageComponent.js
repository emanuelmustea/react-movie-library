import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MoviesService from '../api/moviesService';
import Carousel from '../carousel/Carousel';
import CastingList from './CastingListComponent';
import Loading from '../LoadingComponent/LoadingComponent';
import { formatDateFromString, imagePathToSrc, dateToYear } from '../helpers/helpers';

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
      <div className="row movie-page-div">
        <div className="col three">
          <Carousel
            autoSlide={true}
            slideAfter={6000}
            transitionDuration={1000}
            imgs={[imagePathToSrc(poster_path), imagePathToSrc(backdrop_path), imagePathToSrc(poster_path), imagePathToSrc(backdrop_path)]}
          />
        </div>
        <div className="col grow">
          <div className="card">
            <div className="card-head">
              <button className="margin back" onClick={this.props.history.goBack}>
                Go back
              </button>
              <button className="margin">Add to watchlist</button>
              {homepage && (
                <a href={homepage} target="_new">
                  <button className="margin">Visit movie homepage</button>
                </a>
              )}
              <h1 className="no-margin">
                <span>{title}</span>
                <span className="grey lighter"> ({dateToYear(release_date)})</span>
              </h1>
              <h3 className="no-margin">{tagline}</h3>
              <br />
              <span>
                {genresList} | <strong>{formatDateFromString(release_date)}</strong>
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
