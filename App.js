import React, { Component } from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import AppRoot from "./containers/AppRoot";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxPromise)));

export default class App extends Component {
  render() {
        return (
    <Provider store={store}>
     <AppRoot />
    </Provider>
  );
  }
}

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;
