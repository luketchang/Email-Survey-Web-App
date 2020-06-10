//data layer control
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App.js';
import reducers from './reducers';

//temporary
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//render App in root div in index.html public
ReactDOM.render(
  //Provider tag is a react component that will update child components
  //when store gets a state change inside it
  <Provider store = {store}><App /></Provider>,
  document.querySelector('#root')
);
