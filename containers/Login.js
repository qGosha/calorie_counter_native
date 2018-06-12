import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import { PasswordEye } from "../components/password-eye";
import { StyleSheet, Text, View } from 'react-native';
import '../style/auth.css';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert,
  InputGroup
} from 'react-bootstrap';
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
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputPasswordChange = this.onInputPasswordChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordVisibilityChange = this.onPasswordVisibilityChange.bind(this);
    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onTestLogin = this.onTestLogin.bind(this);
  }

  onPasswordVisibilityChange() {
    const showPassword = !this.state.showPassword
    this.setState({ showPassword });
  }

  onInputEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  onInputPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
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
      <Alert bsStyle="danger">
        <div>{this.props.err}</div>
    </Alert> :
    null;
    return (
      <form className='form-signin' horizontal='true' onSubmit={this.onFormSubmit}>
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <FormGroup bsSize="lg" controlId="email">
          <ControlLabel htmlFor="email" className="sr-only">Email address</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              placeholder="Email address"
              onChange={this.onInputEmailChange}
              required="true"
            />
          </FormGroup>
      <FormGroup bsSize="lg" controlId="password">
          <ControlLabel htmlFor="password" className="sr-only">Password</ControlLabel>
          <InputGroup bsSize="lg">
            <FormControl
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              placeholder="Password"
              onChange={this.onInputPasswordChange}
              required="true"
              minLength="6"
             maxLength="20"
            />
            <InputGroup.Button>
              <PasswordEye onClick={this.onPasswordVisibilityChange}
             showPassword={this.state.showPassword} />
          </InputGroup.Button>
           </InputGroup>
          </FormGroup>
      <Button type="submit" className="btn-fetch btn btn-primary btn-lg btn-block">{this.props.isFetching ?
      <FontAwesome
              className='fas fa-spinner spinner'
              name='spinner'
              spin
              size='2x'
          /> : ''}
                Sign in

          </Button>

          <p className="switch-login-singup">
             Not registered?{" "}
            <a href="#" onClick={this.onCreateAccount}>
             Create an account
            </a>
          </p>
          <p className="switch-login-singup">
           For testing purposes click <a href="#" onClick={this.onTestLogin}>Test login</a>
          </p>
          {loginErr}
        </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: data => {
      dispatch(signInUser(data)).then(response => {
        if(!response.error) {
          localStorage.setItem('jwt', response.payload.data['x-user-jwt']);
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
