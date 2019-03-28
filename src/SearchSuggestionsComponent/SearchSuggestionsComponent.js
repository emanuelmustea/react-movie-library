import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const movieSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;
const truncateOverview = overview => overview.substring(0, 200) + '...';
export default class SearchSuggestions extends Component {
  render() {
    const { values } = this.props;
    const valuesElements = values.map(value => (
      <Link key={value.id} to={`/movie/${value.id}/${value.title.split(' ').join('_')}`}>
        <img src={movieSrc(value.poster_path)} />
        <div>
          <strong>{value.title}</strong>
          <br />
          {truncateOverview(value.overview)}
        </div>
      </Link>
    ));
    return <div className="suggestions">{valuesElements}</div>;
  }
}
