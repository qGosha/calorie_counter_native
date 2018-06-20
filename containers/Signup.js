import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import { CustomButton } from '../components/customButton'
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
      error: 'Example: abc@abc.com',
      autoCapitalize: 'none'
    },
    repeatpassword: {
      label: 'Repeat password',
      secureTextEntry: true,
      error: 'Password must be 6 characters long',
      autoCapitalize: 'none'
    },
    password: {
      error: 'Password must be 6 characters long',
      secureTextEntry: true,
      autoCapitalize: 'none'
    }
  }
};



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
  Keyboard.dismiss();
    const value = this.refs.form.getValue();
    const { password, repeatpassword } = this.state.value;
   Actions.error({title: 'Signup failed', text: 'Credentials are wrong'})
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
        return;
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
       <KeyboardAwareScrollView
       keyboardShouldPersistTaps='handled'
       showsVerticalScrollIndicator={false}
       enableOnAndroid={true}
       extraHeight={200}
       scrollEnabled={true}
       style={{backgroundColor: '#3498db'}}
       contentContainerStyle={styles.containerAware}>
       <View style={styles.container}>
            <Form
        ref="form"
        type={Sign}
        options={this.state.options}
        value={this.state.value}
        onChange={this.onFormChange}/>

         <View style={{paddingTop:15}}>
           <CustomButton
          text={"SIGN UP"}
          func={this.onFormSubmit}
          isDisabled={this.state.isSubmitDisabled}
          customStyle={{opacity: this.state.isSubmitDisabled ? 0.4 : 1}} />
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
