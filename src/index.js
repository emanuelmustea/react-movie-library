import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MovieAppReducer from './redux/MovieApp';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStore(MovieAppReducer)}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
