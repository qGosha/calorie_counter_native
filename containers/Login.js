import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { DangerZone } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
} from 'react-native';
import { CustomButton } from '../components/customButton';
import t from 'tcomb-form-native';

import {
  signInUser,
  signInUserSuccess,
  signInUserFailure,
  showSignUp,
  showSpinner,
} from '../actions/index';

const Password = t.refinement(t.String, pass => {
  return pass.length > 5;
});

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const Log = t.struct({
  email: Email,
  password: Password,
});

const Form = t.form.Form;

const options = {
  auto: 'placeholders',
  fields: {
    email: {
      keyboardType: 'email-address',
      error: 'Wrong email format',
      autoCapitalize: 'none',
    },
    password: {
      error: 'Password must be min. 6 characters long',
      secureTextEntry: true,
      autoCapitalize: 'none',
    },
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitDisabled: true,
      value: {
        email: '',
        password: '',
      },
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.clearForm = this.clearForm.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    // this.onTestLogin = this.onTestLogin.bind(this);
  }

  onFormChange = value => {
    this.setState({ value }, () => {
      const stateVal = this.state.value;
      const disable = Object.keys(stateVal).some(i => !stateVal[i]);
      this.setState({ isSubmitDisabled: disable });
    });
  };

  onFormSubmit() {
    Keyboard.dismiss();
    const value = this.refs.form.getValue();
    if (value) {
      const data = this.state.value;
      this.props.showSpinner();
      this.props.signInUser(data);
    }
  }

  // clearForm() {
  //   const value = this.state.value;
  //   value.email = '';
  //   value.password ='';

  // }

  // onTestLogin() {
  //   const data = {
  //     email: "zxoxz@mail.ru",
  //     password: "123456"
  //   }
  //   this.props.signInUser(data);
  // }

  render() {
    const isSubmitDisabled = this.state.isSubmitDisabled;
    const isFetching = this.props.isFetching;
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraHeight={200}
        scrollEnabled={true}
        style={{ backgroundColor: '#3498db' }}
        contentContainerStyle={styles.containerAware}>
        <View style={styles.container}>
          <Form
            ref="form"
            type={Log}
            options={options}
            value={this.state.value}
            onChange={this.onFormChange}
          />

          <View style={{ paddingTop: 15 }}>
            <CustomButton
              text={'LOGIN'}
              func={this.onFormSubmit}
              isDisabled={isSubmitDisabled || isFetching}
              customStyle={{
                opacity: isSubmitDisabled || isFetching ? 0.4 : 1,
              }}
              indicate={isFetching}
            />
            <CustomButton text={'SIGN UP'} func={() => AsyncStorage.getItem('basket').then(response => alert(response))} />
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
    backgroundColor: '#3498db',
  },
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => {
      dispatch(signInUser(data))
        .then(response => {
          if (!response.error) {
            const data = response.payload.data['x-user-jwt'];
            dispatch(signInUserSuccess(data));
            AsyncStorage.setItem('jwt', data, () => {
              Actions.dashboard();
            }).catch(er => {
              Actions.error({ title: 'Data upload failed', text: er });
            });
          } else {
            return Promise.reject(response.payload.response.data.message);
          }
        })
        .catch(er => {
          dispatch(signInUserFailure());
          const message =
            (er && er.response && er.response.data.message) || 'Error';
          Actions.error({ title: 'Login failed', text: message });
        });
    },
    showSignUp: () => dispatch(showSignUp()),
    showSpinner: () => dispatch(showSpinner()),
  };
};
const mapStateToProps = state => ({
  err: state.auth.error,
  isFetching: state.auth.isFetching,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
