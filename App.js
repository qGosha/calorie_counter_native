import React, { Component } from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware, compose } from 'redux';
import AppRoot from "./containers/AppRoot";


const store = createStore(rootReducer, applyMiddleware(ReduxPromise));

export default class App extends Component {
  render() {
        return (
    <Provider store={store}>
     <AppRoot />
    </Provider>
  );
  }
}






