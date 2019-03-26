import React, { Component } from 'react';
import MoviesApi from '../api/movies';
import heart from '../../public/img/heart-o.png';
import Loading from '../loading/Loading';
import '../ui/ui.css';

export default class FiltersAside extends Component {
  constructor() {
    super();
    this.MoviesApi = new MoviesApi();
    this.MoviesApi.getGenresList().then(res => this.setState({ genres: res.genres }));
    this.state = { genres: [] };
  }
  render() {
    let genresList = this.state.genres.map(genre => (
      <div key={genre.id}>
        <label>
          <input type="checkbox" onChange={() => this.props.toggleGenre(genre.name)} />
          {genre.name}
        </label>
      </div>
    ));
    return (
      <aside className="filters" style={{ padding: 30, paddingTop: 110, paddingRight: 0 }}>
        <div className="card">
          <div className="card-head">Filters</div>
          <div className="card-body">{genresList}</div>
          <div className="card-body">
            <button className="primary" onClick={this.props.applyFilters}>
              Save Filters
            </button>
          </div>
        </div>
      </aside>
    );
  }
}
