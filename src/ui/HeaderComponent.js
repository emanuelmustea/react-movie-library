import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchSuggestions from '../SearchSuggestionsComponent/SearchSuggestionsComponent';
import MoviesService from '../api/moviesService';
import logo from '../../public/img/brand.png';
import { debounce } from '../helpers/helpers';
import './ui.css';

class Header extends Component {
  constructor() {
    super();
    this.state = { searchSuggestions: [] };
    this.submitSearch = this.submitSearch.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  submitSearch(event) {
    event.preventDefault();
    const searchInputValue = event.target.elements.field.value;
    event.target.elements.field.blur();
    this.props.history.push('/search/' + searchInputValue);
  }
  getSearchResults = () => {
    MoviesService.search(this.state.inputValue, 1, 4).then(res => {
      this.setState({ searchSuggestions: res });
      return res;
    });
  };
  handleKeyUp(event) {
    let inputValue = event.target.value;
    this.setState({ inputValue }, () => {
      this.debounceSearch();
    });
  }
  componentDidMount() {
    this.debounceSearch = debounce(this.getSearchResults);
  }
  render() {
    const pathNameArray = this.props.location.pathname.split('/');
    const query = pathNameArray[1] === 'search' ? pathNameArray[2] : '';
    const renderSearchSuggestions = this.state.searchSuggestions.length > 0 ? <SearchSuggestions values={this.state.searchSuggestions} /> : null;
    return (
      <nav>
        <div className="header-brand">
          <img src={logo} className="logo" />
        </div>
        <form className="search-bar" onSubmit={this.submitSearch}>
          <input name="field" type="text" autoComplete="off" defaultValue={query} onKeyUp={this.handleKeyUp} placeholder="Search" />
          {renderSearchSuggestions}
          <button type="submit">Search</button>
        </form>
        <div className="nav-menu">
          <Link to="/#top">List all movies</Link>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
