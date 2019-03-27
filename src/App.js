import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import SearchComponent from './SearchComponent/SearchComponent';
import './style.css';

import Header from './ui/Header';
import './App.css';
import MainPage from './MainPageComponent/MainPageComponent';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div style={{ paddingTop: 100 }}>
          <Switch>
            <Route exact path="/" component={withRouter(MainPage)} />
            <Route path="/search/:query" component={withRouter(SearchComponent)} />
            <Route
              path="/about"
              component={() => (
                <h1>
                  dsdadasd
                  <br />
                  fdsfdsf
                  <br />
                  fdfsdfdsf
                </h1>
              )}
            />
          </Switch>
        </div>
        <Header />
      </Fragment>
    );
  }
}
export default withRouter(App);
