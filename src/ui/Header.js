import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../public/img/brand.png';
import './ui.css';

class Header extends Component {
  constructor() {
    super();
    this.submitSearch = this.submitSearch.bind(this);
  }
  submitSearch(event) {
    event.preventDefault();
    const searchInputValue = event.target.elements.field.value;
    this.props.history.push('/search/' + searchInputValue);
  }
  render() {
    const pathNameArray = this.props.location.pathname.split('/');
    const query = pathNameArray[1] === 'search' ? pathNameArray[2] : '';
    return (
      <nav>
        <div className="header-brand">
          <img src={logo} className="logo" />
        </div>
        <form className="search-bar" onSubmit={this.submitSearch}>
          <input name="field" type="text" defaultValue={query} placeholder="Search" />
          <button type="submit">Search</button>
        </form>
        <div className="nav-menu">
          <Link to="/">List all movies</Link>
          <Link to="/search/search">By Category</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
