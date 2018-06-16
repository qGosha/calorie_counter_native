import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  showSignUp,
  showSpinner
} from "../actions/index";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordVisibilityChange = this.onPasswordVisibilityChange.bind(this);
    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onTestLogin = this.onTestLogin.bind(this);
  }

  onPasswordVisibilityChange() {
    const showPassword = !this.state.showPassword
    this.setState({ showPassword });
  }


  onFormSubmit(event) {
    event.preventDefault();
    this.props.signInUser(this.state);
    this.props.showSpinner();
    this.setState({ email: "", password: "" });
  }

  onCreateAccount(event) {
    event.preventDefault();
    this.props.showSignUp();
  }

  onTestLogin() {
    const data = {
      email: "zxoxz@mail.ru",
      password: "123456"
    }
    this.props.signInUser(data);
  }

  render() {
    const loginErr = this.props.err ?
      <View>
        <Text>{this.props.err}</Text>
    </View> :
    null;
    const button = (text, func) => {
      return <TouchableOpacity
            style={styles.buttonContainer}
            onPress={func}
          >
          <Text style={styles.buttonText}>{text}</Text>
          </TouchableOpacity>
    }
    return (
      <KeyboardAwareScrollView scrollEnabled={true} style={styles.container}>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Your email'}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType='next'
            keywordType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            returnKeyType='go'
            secureTextEntry={true}
            style={styles.input}
            ref={(input) => this.passwordInput = input}
          />

          {button("LOGIN", this.onFormSubmit)}
          {button("SIGN UP", () => Actions.signup() )}
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: 300,
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginTop: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => {
      dispatch(signInUser(data)).then(response => {
        if(!response.error) {
          // localStorage.setItem('jwt', response.payload.data['x-user-jwt']);
          dispatch(signInUserSuccess(response.payload.data));
        } else {
          dispatch(signInUserFailure(response.payload.response.data.message));
        }
      });
    },
    showSignUp: () => dispatch(showSignUp()),
    showSpinner: () => dispatch(showSpinner())
  };
};
const mapStateToProps = state => ({
  err: state.auth.error,
  isFetching: state.auth.isFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
