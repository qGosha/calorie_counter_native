import React from 'react';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/index';

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
              onPress={() => Actions.settings()}
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
          <Image
            source={require('../assets/copyright.png')}
            style={styles.image}
          />
        </View>
      </View>
    </Container>
  );
};


const styles = StyleSheet.create({
  sectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    borderColor: '#ddd',
  },
  viewContainer: {
    paddingTop: 40,
    paddingVertical: 20,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#b3ecde',
  },
  image: {
    width: 160,
    height: 40,
    paddingTop: 6
  }
});

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DrawerContent);
