import React, { Component } from "react";
import { connect } from "react-redux";
// import Dashboard from "./Dashboard";
// import  Signup  from "./Signup";
// import Login from "./Login";
// import ModalRoot from "./Modal";
// import ErrorHandle from "./ErrorHandle";
import { StyleSheet, Text, View } from 'react-native';
class AppRoot extends Component {

  render() {
  //   const combinedComps = (Comp) => {
  //     return (
  //      <View>
  //       {Comp}
  //      </View>
  //   )
  // }
  //   if (this.props.auth.logged) return combinedComps(<Dashboard />);
  //   else if (this.props.auth.signup) return combinedComps(<Signup />);
  //   else return combinedComps(<Login />);
    return (
         <View style={{
           flex: 1,
           backgroundColor: '222'
         }}>
          <Text>Hello World</Text>
         </View>
      )
  }

}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppRoot);
