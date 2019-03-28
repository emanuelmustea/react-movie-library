import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../ui/ui.css';
import heart from '../../public/img/heart-o.png';

class MovieOverview extends Component {
  render() {
    const { movieData } = this.props;
    const movieSrc = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
    const overview = movieData.overview.substring(0, 200) + '...';
    const { title, id, vote_count } = movieData;
    const rating = movieData.vote_average;

    return (
      <div className={this.props.className}>
        <div className="card hoverable" onClick={() => this.props.history.push(`/movie/${id}/${title.split(' ').join('_')}`)}>
          <div className="card-head image">
            <img src={movieSrc} />
          </div>
          <div className="card-body">
            <h4>{title}</h4>
            {overview}
          </div>
          <div className="card-footer">
            <div className="padding lighter">
              <h1>{rating}/10</h1>
              by {vote_count} reviews
            </div>
            <ul>
              <li>Read more</li>
              <li>Add to watchlist</li>
              <li>
                <img className="icon" src={heart} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(MovieOverview);
