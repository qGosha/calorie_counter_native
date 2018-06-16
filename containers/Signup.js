import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Label, Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure,
  hideSignUp,
  showSpinner
} from "../actions/index";

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const RepeatPassword = t.refinement(t.String, pass => {
  return pass.length > 5;
});

const Password = t.refinement(t.String, pass => {
  return pass.length > 5;
});

const Sign = t.struct({
  name: t.String,
  email: Email,
  password: Password,
  repeatpassword: RepeatPassword
});

const Form = t.form.Form;

const options = {
  fields: {
    error: 'Passwords must match',
    email: {
      keyboardType: 'email-address',
      error: 'Example: abc@abc.com'
    },
    repeatpassword: {
      label: 'Repeat password',
      secureTextEntry: true,
      error: 'Password must be 6 characters long' 
    },
    password: {
      error: 'Password must be 6 characters long',
      secureTextEntry: true
    }
  }
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
     value: null,
     options: options
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);

  }
  

onFormSubmit = () => {
    const value = this.refs.form.getValue();
    const { password, repeatpassword } = this.state.value;
    alert(password);
      if (password !== repeatpassword) {
        const options = t.update(this.state.options, {
          fields: {
            repeatpassword: {
              hasError: { $set: true },
              error: { $set: 'Password must match' }
            }
          }
        })
        this.setState({options: options});
      } else {
        alert(this.state.value);
      }
  
  }

  onLoginAccount(event) {
    event.preventDefault();
    this.setState({ email: "", password: "", first_name: "" });
    this.props.hideSignUp();
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
         <Form 
         ref="form"
         type={Sign}
         options={this.state.options}
         value={this.state.value}
         onChange={(value) => this.setState({value})}/>
          {button("SIGN UP", this.onFormSubmit)}
          {button("Already have an account?", () => Actions.pop() )}
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
    signUpUser: data => {
      dispatch(signUpUser(data)).then(response => {
        !response.error
          ? dispatch(signUpUserSuccess(response.payload.data))
          : dispatch(signUpUserFailure(response.payload.response.data.message));
      });
    },
    hideSignUp: () => dispatch(hideSignUp()),
    showSpinner: () => dispatch(showSpinner())
  };
};
const mapStateToProps = state => ({
  err: state.auth.error,
  isFetching: state.auth.isFetching
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
