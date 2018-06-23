import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

class DrawerContent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Drawer Content</Text>
        <Button onPress={Actions.closeDrawer}>Back</Button> */}
        <Text>Title: Drawerr first screensdv</Text>
        <Button title="back" onPress={Actions.pop}>Back</Button>
        <Button title="234" onPress={Actions.tab_2}>Switch to tab1</Button>
        <Button title="234" onPress={Actions.tab_2_1}>Switch to tab2</Button>
        <Button title="234" onPress={Actions.tab_2_2}>Switch to tab2</Button>
      </View >
    );
  }
}

export default DrawerContent;
