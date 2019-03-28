import React, { Component } from 'react';

const movieSrc = imagePath => `https://image.tmdb.org/t/p/w500/${imagePath}`;
const truncateOverview = overview => overview.substring(0, 200) + '...';
export default class SearchSuggestions extends Component {
  render() {
    const { values } = this.props;
    console.log(values);
    const valuesElements = values.map(value => (
      <a key={value.id}>
        <img src={movieSrc(value.poster_path)} />
        <div>
          <strong>{value.title}</strong>
          <br />
          {truncateOverview(value.overview)}
        </div>
      </a>
    ));
    return <div className="suggestions">{valuesElements}</div>;
  }
}
