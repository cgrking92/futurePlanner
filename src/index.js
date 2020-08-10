import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'Root';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import modules from './modules';
import { createStore,applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import loggerMiddleware from './lib/loggerMiddleware';
let store = '';
if (document.location.origin === 'http://localhost:3000') {
  store = createStore(modules,applyMiddleware(loggerMiddleware));
}else{
  store = createStore(modules,applyMiddleware(loggerMiddleware));
}

ReactDOM.render(  
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
