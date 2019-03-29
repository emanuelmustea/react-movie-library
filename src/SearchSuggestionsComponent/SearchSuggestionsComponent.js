import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { imagePathToSrc } from '../helpers/helpers';

const truncateOverview = overview => overview.substring(0, 200) + '...';
export default class SearchSuggestions extends Component {
  render() {
    const { values } = this.props;
    const valuesElements = values.map(value => {
      const moviePath = `/movie/${value.id}/${value.title.split(' ').join('_')}`;
      return (
        <Link key={value.id} to={moviePath}>
          <img src={imagePathToSrc(value.poster_path)} />
          <div>
            <div>
              <strong>{value.title}</strong>
            </div>
            <div>{truncateOverview(value.overview)}</div>
          </div>
        </Link>
      );
    });
    return <div className="suggestions">{valuesElements}</div>;
  }
}
