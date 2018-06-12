import React, { Component } from "react";
import { connect } from "react-redux";
import { PasswordEye } from "../components/password-eye";
import FontAwesome from 'react-fontawesome';
import '../style/auth.css';
import {
  signUpUser,
  signUpUserSuccess,
  signUpUserFailure,
  hideSignUp,
  showSpinner
} from "../actions/index";

import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Alert,
  InputGroup
} from 'react-bootstrap';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      showPassword: false
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordVisibilityChange = this.onPasswordVisibilityChange.bind(this);
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputPasswordChange = this.onInputPasswordChange.bind(this);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);

  }
  onInputNameChange(event) {
    this.setState({
      first_name: event.target.value
    });
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

  onPasswordVisibilityChange() {
    const showPassword = !this.state.showPassword
    this.setState({ showPassword });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.showSpinner();
    this.props.signUpUser(this.state);

    this.setState({ email: "", password: "", first_name: "" });
  }
  onLoginAccount(event) {
    event.preventDefault();
    this.setState({ email: "", password: "", first_name: "" });
    this.props.hideSignUp();
  }
  render() {
    const signupErr = this.props.err ?
      <Alert bsStyle="danger">
        <div>{this.props.err}</div>
      </Alert> :
      null;

    return (
      <form className='form-signin' onSubmit={this.onFormSubmit}>
        <h1 className="h3">Signup</h1>
        <FormGroup bsSize="lg" controlId="name">
          <ControlLabel htmlFor="name">Your name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.first_name}
            placeholder="Your name"
            onChange={this.onInputNameChange}
            required="true"
          />
        </FormGroup>
        <FormGroup bsSize="lg" controlId="email">
          <ControlLabel htmlFor="email">Email address</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Email address"
            onChange={this.onInputEmailChange}
            required="true"
          />
        </FormGroup>
        <FormGroup bsSize="lg" controlId="password">
          <ControlLabel htmlFor="password">Password</ControlLabel>
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
          Sign up
          </Button>

        <p className="switch-login-singup">
          Have an account? <a href="#" onClick={this.onLoginAccount}>Log in</a>
        </p>
        {signupErr}
      </form>
    );
  }
}


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
