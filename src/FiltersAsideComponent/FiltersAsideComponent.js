import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesService from '../api/moviesService';
import LoadingBars from '../LoadingComponent/LoadingBarsComponent';
import '../ui/ui.css';
import SingleFilterComponent from './SingleFilterComponent';

export default class FiltersAside extends Component {
  constructor() {
    super();
    this.state = { genres: [] };
    MoviesService.getGenresList().then(res => this.setState({ genres: res.genres }));
    //   .then(res => console.log(this.state.genres));
  }
  buildGenresList() {
    return this.state.genres.map(genre => {
      const mapStateToProps = (state, ownProps) => {
        return {
          name: ownProps.name,
          id: ownProps.id,
          active: false // state.filters.find(filter => filter.id === ownProps.id).active
        };
      };
      const mapDispatchToProps = (dispatch, ownProps) => {
        return {
          onFilterToggle: () => {
            dispatch({
              type: 'TOGGLE_FILTER',
              id: ownProps.id
            });
          }
        };
      };
      const ToggledSingleFilters = connect(
        mapStateToProps,
        mapDispatchToProps
      )(SingleFilterComponent);

      return <ToggledSingleFilters key={genre.id} id={genre.id} name={genre.name} />;
    });
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
