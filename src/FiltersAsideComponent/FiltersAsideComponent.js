import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesService from '../api/moviesService';
import LoadingBars from '../LoadingComponent/LoadingBarsComponent';
import '../ui/ui.css';
import SingleFilterComponent from './SingleFilterComponent';

class FiltersAside extends Component {
  constructor() {
    super();
    this.state = { genres: [] };
  }
  buildGenresList() {
    const { updateFilters } = this.props;
    return this.state.genres.map(genre => <SingleFilterComponent onChange={updateFilters} key={genre.id} id={genre.id} name={genre.name} />);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'DELETE_FILTERS'
    // });
    MoviesService.getGenresList()
      .then(res => {
        this.setState({ genres: res.genres });
        return res.genres;
      })
      .then(genres =>
        dispatch({
          type: 'ADD_FILTER',
          value: genres.map(genre => ({ ...genre, active: false }))
        })
      );
  }
  render() {
    const genresList = this.buildGenresList();
    return (
      <aside className="filters" style={{ padding: 30, paddingTop: 10, paddingRight: 0 }}>
        <div className="card">
          <div className="card-head">Filters</div>
          <div className="card-body">
            {genresList.length > 0 && genresList}
            {!genresList.length > 0 && <LoadingBars class="full margin" repeat="19" />}
          </div>
        </div>
      </aside>
    );
  }
}
export default connect()(FiltersAside);
