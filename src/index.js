import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MovieAppReducer from './redux/MovieApp';

const store = createStore(MovieAppReducer);
const render = () => {
  console.log('has updated');
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App state={store.getState()} />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
