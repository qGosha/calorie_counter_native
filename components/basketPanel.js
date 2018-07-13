import React from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
  Image,
  TouchableOpacity,
  ListView,
} from 'react-native';
import {
  List,
  Container,
  ListItem,
  Text,
  Separator,
  Button,
  Content,
  View,
  SwipeRow,
  Icon,
  Tab,
  Tabs,
  Input,
  Picker,
  Item,
} from 'native-base';
import { TotalPanel } from './totalPanel';
import { MenuHeader } from './menuHeader';
import { DynamicItem } from './dynamicItem';
import { Actions } from 'react-native-router-flux';
import { round, getFullNutrition } from '../helpers/help_functions';

export const BasketPanel = ({
  basket,
  deleteItem,
  onQtyChange,
  onMeasureChange,
  clearBasket,
  log
}) => {
  let basketFood;
  if (!basket.length) {
    basketFood = null;
  } else {
    basketFood = basket.map((basketItem, i) => {
     return <DynamicItem
      withInfo={true}
      i={i}
      item={basketItem}
      onMeasureChange={onMeasureChange}
      onQtyChange={onQtyChange}
     />
  })
}
  const noFoodAdded = (
    <View
      style={{
        alignSelf: 'center',
        marginTop: 90,
        width: 170,
      }}>
      <Icon
        type="FontAwesome"
        name="arrow-up"
        style={{ color: 'grey', alignSelf: 'center' }}
      />
      <Text style={{ color: 'grey', marginTop: 25, textAlign: 'center' }}>
        No food added. Use search to find and add some food to your basket.
      </Text>
    </View>
  );

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  return (
    <Container>
      <MenuHeader />
      <Content>
        {basketFood ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.tip}>Swipe left to delete</Text>
            <List
              dataSource={ds.cloneWithRows(basketFood)}
              disableRightSwipe
              renderRow={basketFood => basketFood}
              renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                <Button
                  full
                  danger
                  onPress={() => {
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    deleteItem(rowId);
                  }}>
                  <Icon active name="trash" />
                </Button>
              )}
              rightOpenValue={-75}
            />
            <TotalPanel foods={basket} />
            <View style={styles.control}>
              <View style={{ flex: 1 }}>
                <Button
                  iconLeft
                  success
                  onPress={log}
                  style={[styles.buttons, { marginBottom: 8 }]}>
                  <Icon type="FontAwesome" name="pencil" />
                  <Text>Log {basket.length ? basket.length : null} food</Text>
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  iconLeft
                  danger
                  style={styles.buttons}
                  onPress={() =>
                    Actions.error({
                      confirm: true,
                      title: 'Confirm',
                      text:
                        'Are you sure you want to remove all food form the basket?',
                      func: clearBasket,
                      positiveText: 'Yes',
                      negativeText: 'No',
                    })
                  }>
                  <Icon type="FontAwesome" name="trash" />
                  <Text>Clear basket</Text>
                </Button>
              </View>
            </View>
          </View>
        ) : (
          noFoodAdded
        )}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 200,
    justifyContent: 'flex-start',
    paddingLeft: 30,
  },
  control: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
  },
  tip: {
    paddingVertical: 5,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
