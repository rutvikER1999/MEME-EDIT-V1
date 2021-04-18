import { Component } from 'react'
import React from 'react';
import SwitchNavigator from './navigation/LoginNavigator'

import thunkMiddleware from 'redux-thunk'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'


const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default class App extends React.Component {

  

  render(){
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>
    );
  }
}


