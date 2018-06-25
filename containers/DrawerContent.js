import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button, Icon, Text } from 'native-base';

const CardSection = (props) => {
    return (
        <View style={[styles.CardSectionStyle, props.style]} >
            {props.children}
        </View>
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
    justifyContent:'space-between',
    flex: 1,
    backgroundColor: '#b3ecde'
  },

});

const DrawerContent = () => {
    return (
      <Container>
      <View style={styles.viewContainer}>
      <View>
       <View style={styles.sectionStyle}>
       <Button
       onPress={() => Actions.dashboard()}
       iconLeft
       block
       style={{justifyContent: "flex-start"}}>
        <Icon type="FontAwesome" name='home'/>
        <Text>Dashboard</Text>
       </Button>
       </View>
       <View style={styles.sectionStyle}>
       <Button
       onPress={() => Actions.signup()}
       iconLeft
       block
       style={{justifyContent: "flex-start"}}>
        <Icon type="FontAwesome" name='cogs'/>
        <Text>Settings</Text>
       </Button>
       </View>
       </View>
       <View style={styles.sectionStyle}>
       <Button
       onPress={() => Actions.login()}
       iconLeft
       block
       style={{justifyContent: "flex-start"}}>
        <Icon type="FontAwesome" name='sign-out'/>
        <Text>Sign out</Text>
       </Button>
       </View>
      </View>
      </Container>
    );
}

export default DrawerContent;
