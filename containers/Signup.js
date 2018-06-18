import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Label, Text, View, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';

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

// const stylesheet = cloneDeep(t.form.Form.stylesheet);

const Sign = t.struct({
  name: t.String,
  email: Email,
  password: Password,
  repeatpassword: RepeatPassword
});

const Form = t.form.Form;

  t.form.Form.stylesheet.textbox.normal.height = 45;
  t.form.Form.stylesheet.textbox.normal.backgroundColor = '#fff';
  t.form.Form.stylesheet.textbox.normal.fontSize = 18;
  t.form.Form.stylesheet.textbox.error.height = 45;
  t.form.Form.stylesheet.textbox.error.backgroundColor = '#fff';
  t.form.Form.stylesheet.textbox.error.fontSize = 18;

const options = {
  fields: {
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

const CustomButton = ({text, func, isDisabled, customStyle}) => {
  return (
    <TouchableOpacity
        style={[styles.buttonContainer, customStyle]}
        onPress={func}
        disabled={isDisabled}
      >
      <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
}

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
     isSubmitDisabled: true,
     value: {
       name: '',
       email: '',
       password: '',
       repeatpassword: ''
     },
     options: options
    };
   this.onFormChange = this.onFormChange.bind(this);
   this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);

  }

onFormChange = (value) => {
  this.setState({value}, () => {
    const stateVal = this.state.value;
    const disable = Object.keys(stateVal).some(i => !stateVal[i]);
    this.setState({isSubmitDisabled: disable})
  })
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

    return (
      <View style={styles.container}>
       <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={styles.containerAware}>
         <Form
         ref="form"
         type={Sign}
         options={this.state.options}
         value={this.state.value}
         onChange={this.onFormChange}/>
          <CustomButton
          text={"SIGN UP"}
          func={this.onFormSubmit}
          isDisabled={this.state.isSubmitDisabled}
          customStyle={{opacity: this.state.isSubmitDisabled ? 0.4 : 1}} />

        </KeyboardAwareScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerAware: {
    flex: 1,
    width: 300,
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db'
  },

  buttonContainer: {
    width: 180,
    borderColor: '#2980b9',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
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
