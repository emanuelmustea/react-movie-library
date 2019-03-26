import React, { Component } from 'react';
import './ui.css';
import logo from '../../public/img/brand.png';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="header-brand">
          <img src={logo} className="logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="nav-menu">
          <a href="#allmovies">List all movies</a>
          <a href="#bycategory">By Category</a>
        </div>
      </nav>
    );
  }
}
