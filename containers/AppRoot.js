import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchFromStorage } from '../helpers/help_functions';
import RouterComponent from "./Router";
import { StyleSheet, Text, View } from 'react-native';


export default class AppRoot extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    isLoginConfirmed: false,
    fetchedJwt: null
  }
}

componentDidMount() {
  fetchFromStorage()
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

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, null)(AppRoot);
