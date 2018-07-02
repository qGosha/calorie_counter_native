import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, Icon, Badge } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
const BasketIcon = props => {
  let basket = props.basket;
  const isBasketNotEmpty = (basket && basket.length) || null;
  const badge = isBasketNotEmpty ? (
    <Badge style={styles.icons}>
      <Text>{basket.length}</Text>
    </Badge>
  ) : null;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => alert('sdfsdfsd')}>
      <Icon
        type="FontAwesome"
        name="shopping-basket"
        style={([styles.icons], { color: isBasketNotEmpty ? 'green' : 'gray' })}
      />
      {badge}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginLeft: 10
  },
  icons: {
    position: 'absolute',
    top: -5,
    left: 10,
  },
});

const mapStateToProps = state => ({
  basket: state.basket,
});

export default connect(
  mapStateToProps,
  null
)(BasketIcon);
