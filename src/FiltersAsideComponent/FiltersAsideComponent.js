import React, { Component } from 'react';
import MoviesService from '../api/moviesService';
import Loading from '../LoadingComponent/LoadingComponent';
import '../ui/ui.css';

export default class FiltersAside extends Component {
  constructor() {
    super();
    this.state = { genres: [] };
    MoviesService.getGenresList().then(res => this.setState({ genres: res.genres }));
  }
  buildGenresList() {
    return this.state.genres.map(genre => (
      <div key={genre.id}>
        <label>
          <input type="checkbox" onChange={() => this.props.toggleGenre(genre.name)} />
          {genre.name}
        </label>
      </div>
    ));
  }
  render() {
    const genresList = this.buildGenresList();
    return (
      <aside className="filters" style={{ padding: 30, paddingTop: 10, paddingRight: 0 }}>
        <div className="card">
          <div className="card-head">Filters</div>
          <div className="card-body">
            {genresList.length && genresList}
            {!genresList.length && <Loading class="full margin" type="bar" repeat="19" />}
          </div>
        </div>
      </aside>
    );
  }
}
