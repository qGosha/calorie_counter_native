import React from 'react';
import FoodLog from '../containers/FoodLog';
import { MenuHeader } from './menuHeader';
import {
  Container,
  View,
  Text,
  Content,
} from 'native-base';

export const DashboardPanel = ({
  currentDate
}) => {
  return (
    <Container>
      <MenuHeader />
      <Content>
      <View style={{
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderColor: '#ddd'}}>
       <Text style={{fontSize: 14, fontWeight: '700'}}>{currentDate}</Text>
      </View>
      <FoodLog />
      </Content>
    </Container>
  );
};
