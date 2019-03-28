import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import SearchComponent from './SearchComponent/SearchComponent';
import MainPage from './MainPageComponent/MainPageComponent';
import Header from './ui/HeaderComponent';
import './style.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ paddingTop: 100 }}>
          <Switch>
            <Route exact path="/" component={withRouter(MainPage)} />
            <Route path="/search/:query" component={withRouter(SearchComponent)} />
          </Switch>
        </div>
        <Header />
      </Fragment>
    );
  }
}
export default withRouter(App);
