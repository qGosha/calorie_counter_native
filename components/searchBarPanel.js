import React from 'react';
import { Actions } from 'react-native-router-flux';
import BasketIcon from '../containers/BasketIcon.js';
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Content,
  View,
} from 'native-base';
import { StyleSheet } from 'react-native';

export const SearchBarPanel = ({
  term,
  onSearchBarFocus,
  onInputChange,
  initialScreen,
  panel,
  onSubmit
}) => {
  return (
    <Container>
      <Header
        searchBar
        rounded
        hasTabs
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 0,
        }}>
        <Item style={{flex: 4}}>
          <Icon type="FontAwesome" name="search" />
          <Input
            placeholder="Search food"
            autoFocus
            onFocus={onSearchBarFocus}
            value={term}
            onChangeText={term => onInputChange(term)}
          />
          <Icon
            type="FontAwesome"
            name="times"
            onPress={() => onInputChange(false)}
          />
        </Item>
       <BasketIcon />
      </Header>
      {panel}
    </Container>
  );
};
