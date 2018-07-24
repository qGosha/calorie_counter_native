import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/index';
const CardSection = props => {
  return (
    <View style={[styles.CardSectionStyle, props.style]}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  sectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    borderColor: '#ddd',
  },
  viewContainer: {
    paddingVertical: 20,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#b3ecde',
  },
});

const DrawerContent = props => {
  const onSignOut = () => {
    AsyncStorage.removeItem('jwt', () => {
      props.signOutUser();
      Actions.login();
    }).catch(er => {
      Actions.error({ title: 'Data fetch failed', text: er });
    });
  };
  return (
    <Container>
      <View style={styles.viewContainer}>
        <View>
          <View style={styles.sectionStyle}>
            <Button
              onPress={() => Actions.dashboard()}
              iconLeft
              block
              style={{ justifyContent: 'flex-start' }}>
              <Icon type="FontAwesome" name="home" />
              <Text>Dashboard</Text>
            </Button>
          </View>
          <View style={styles.sectionStyle}>
            <Button
              onPress={() => Actions.signup()}
              iconLeft
              block
              style={{ justifyContent: 'flex-start' }}>
              <Icon type="FontAwesome" name="cogs" />
              <Text>Settings</Text>
            </Button>
          </View>
          <View style={styles.sectionStyle}>
            <Button
              onPress={() => Actions.datePicker()}
              iconLeft
              block
              style={{ justifyContent: 'flex-start' }}>
              <Icon type="FontAwesome" name="calendar" />
              <Text>Calendar</Text>
            </Button>
          </View>
        </View>
        <View style={styles.sectionStyle}>
          <Button
            onPress={onSignOut}
            iconLeft
            block
            style={{ justifyContent: 'flex-start' }}>
            <Icon type="FontAwesome" name="sign-out" />
            <Text>Sign out</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DrawerContent);
