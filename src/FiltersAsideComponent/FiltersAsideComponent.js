import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesService from '../api/moviesService';
import LoadingBars from '../LoadingComponent/LoadingBarsComponent';
import '../ui/ui.css';
import SingleFilterComponent from './SingleFilterComponent';

class FiltersAside extends Component {
  constructor() {
    super();
  }
  toggleFilter(id){
    this.props.onFilterToggle(id);
  }
  componentWillReceiveProps (nextprops){
    console.log('recieved props', nextprops);
  }
  buildFilterList() {
    const {filters} = this.props;
    return filters.map(genre => <SingleFilterComponent key={genre.id} filterObj={genre} onFilterToggle={(id)=>this.toggleFilter(id)} />);
  }
  componentDidMount() {
    const { addFilters, deleteFilters } = this.props;
    if (this.props.filters.length == 0) {

    MoviesService.getGenresList()
      .then(res => res.genres)
      .then(filters => {
          console.log('dad')
          deleteFilters();
          addFilters(filters);
      });
    }
  }

  render() {
    const genresList = this.buildFilterList();
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
const mapStateToProps = state => ({
  filters: state.filters
});
const mapDispatchToProps = (dispatch) => {
  return {
    onFilterToggle: (id) => {
      dispatch({
        type: 'TOGGLE_FILTER',
        id: id
      });
    },
    deleteFilters: () =>{
      dispatch({
        type: 'DELETE_FILTERS'
      });
    },
    addFilters: (filters) =>{
      dispatch({
        type: 'ADD_FILTER',
        value: filters.map(genre => ({ ...genre, active: false }))
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FiltersAside);
