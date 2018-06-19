import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { CustomButton } from '../components/customButton'
import t from 'tcomb-form-native';

import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  showSignUp,
  showSpinner
} from "../actions/index";

const Password = t.refinement(t.String, pass => {
  return pass.length > 5;
});

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Log = t.struct({
  email: Email,
  password: Password
});

const Form = t.form.Form;

const options = {
  auto: 'placeholders',
  fields: {
    email: {
      keyboardType: 'email-address',
      error: 'Wrong email format',
      autoCapitalize: 'none'
    },
    password: {
      error: 'Password must be 6 characters long',
      secureTextEntry: true,
      autoCapitalize: 'none'
    },

  }
};


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      value: {
        email: '',
        password: ''
      },
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.onFormChange = this.onFormChange.bind(this);
    // this.onTestLogin = this.onTestLogin.bind(this);
  }

  onFormChange = (value) => {
    this.setState({value}, () => {
      const stateVal = this.state.value;
      const disable = Object.keys(stateVal).some(i => !stateVal[i]);
      this.setState({isSubmitDisabled: disable})
    })
  }

  onFormSubmit() {
    Keyboard.dismiss();
    Actions.error({title: 'Login failed', text: 'Credentials are wrong'})
    // const value = this.refs.form.getValue();
    // const { email, password } = this.state.value;
    // alert(password);
    // this.props.signInUser(this.state.value);
    // this.props.showSpinner();
    // this.setState({ email: "", password: "" });
  }


  // onTestLogin() {
  //   const data = {
  //     email: "zxoxz@mail.ru",
  //     password: "123456"
  //   }
  //   this.props.signInUser(data);
  // }

  render() {
    const loginErr = this.props.err ?
      <View>
        <Text>{this.props.err}</Text>
    </View> :
    null;

    return (

       <KeyboardAwareScrollView
       extraHeight={200}
       scrollEnabled={true}
       style={{backgroundColor: '#3498db'}}
       contentContainerStyle={styles.containerAware}>
       <View style={styles.container}>
         <Form
         ref="form"
         type={Log}
         options={options}
         value={this.state.value}
         onChange={this.onFormChange}/>

         <View style={{paddingTop:15}}>
          <CustomButton
          text={"LOGIN"}
          func={this.onFormSubmit}
          isDisabled={this.state.isSubmitDisabled}
          customStyle={{opacity: this.state.isSubmitDisabled ? 0.4 : 1}} />
          <CustomButton
          text={"SIGN UP"}
          func={() => Actions.signup()} />
          </View>
          </View>
        </KeyboardAwareScrollView>

    );
  }
}

const styles = StyleSheet.create({
  containerAware: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3498db'
  },
  container: {
    flex: 1,
    paddingLeft:15,
    paddingRight:15,
    justifyContent: 'center',
    backgroundColor: '#3498db'
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
