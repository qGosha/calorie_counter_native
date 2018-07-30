import React from 'react';
import BasketIcon from '../containers/BasketIcon.js';
import { Actions } from 'react-native-router-flux';
import {
  Header,
  Item,
  Icon,
  Button,
  Text,
  Content,
} from 'native-base';
import { StyleSheet } from 'react-native';
export const MenuHeader = () => {
  return (
      <Header
        style={styles.header}>
        <Button
          iconLeft
          rounded
          light
          block
          onPress={() => Actions.searchbar()}
          style={styles.button}>
          <Icon type="FontAwesome" name="search" style= {styles.text}/>
          <Text style= {styles.text}>Search food</Text>
        </Button>
       <BasketIcon />
     </Header>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5
  },
  button: {
    flex: 4,
    backgroundColor: '#95cc94',
    alignSelf: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: '700'
  }
});
