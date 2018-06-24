import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CustomButton } from '../components/customButton'
import Icon from 'react-native-vector-icons/FontAwesome';
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
      <View style={styles.viewContainer}>
      <View>
       <View style={styles.sectionStyle}>
       <Icon.Button name="home"
       backgroundColor="#3b5998"
       onPress={() => Actions.dashboard()}>
       Dashboard
       </Icon.Button>
       </View>
       <View style={styles.sectionStyle}>
       <Icon.Button name="cogs"
       backgroundColor="#3b5998"
       onPress={() => Actions.signup()}>
       Settings
       </Icon.Button>
       </View>
       </View>
       <View style={[styles.sectionStyle]}>
       <Icon.Button name="sign-out"
       backgroundColor="#3b5998"
       onPress={() => Actions.login()}>
       Sign out
       </Icon.Button>
       </View>
      </View>
    );
}

export default DrawerContent;
