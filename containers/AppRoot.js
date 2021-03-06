import React, { Component } from "react";
import { fetchFromStorage } from '../helpers/help_functions';
import RouterComponent from "./Router";


export default class AppRoot extends Component {

constructor(props) {
  super(props);
  this.state = {
    isLoginConfirmed: false,
    fetchedJwt: null
  }
}

componentDidMount() {
 fetchFromStorage('jwt')
  .then(value => {
    this.setState({
      isLoginConfirmed: true,
      fetchedJwt: value
    })
  });
}

  render() {
    const isLoginConfirmed = this.state.isLoginConfirmed;
    const value = this.state.fetchedJwt;
    if(isLoginConfirmed) {
      return <RouterComponent
      isLoginConfirmed={isLoginConfirmed}
      value={value} />
    } else {
      return null;
    }

}
}
