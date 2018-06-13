import React, { Component } from "react";
import AppRoot from "./containers/AppRoot";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import ReduxPromise from "redux-promise";
import { createStore, applyMiddleware, compose } from "redux";
import { StyleSheet, Text, View } from 'react-native';

const store = createStore(rootReducer, applyMiddleware(ReduxPromise));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppRoot />
        </View>
      </Provider>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});
//
// import { StyleSheet, Text, View } from 'react-native';
//
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer men</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
