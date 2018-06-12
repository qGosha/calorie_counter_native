import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import '../style/dashboard.css';
import { Container, Row, Col } from 'react-grid-system';
import { DashboardPanel } from '../components/dashboardPanel';

import {
  signOutUser,
  getUser,
  getSuggestedFood,
  fetchUserObjectSuccess,
  fetchSuggestedFoodSuccess,
  fetchDashInfoFailure,
  showLoadingScreen,
  hideLoadingScreen,
  showModal,
  getFoodLog,
  getFoodLogSuccess,
  setDailyCal,
  setDailyCalSuccess,
  setDailyCalFailure,
  setDailyCalNoteRemove,
  getMonthReport,
  getMonthReportSuccess
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onSignOut = this.onSignOut.bind(this);
  this.onLongLoading = this.onLongLoading.bind(this);
  this.dailyCalChange = this.dailyCalChange.bind(this);
}

  onSignOut(event) {
   event.preventDefault();
   this.props.signOutUser();
  }
  onLongLoading() {
    if (!this.props.suggestedFood) {
      this.props.showLoadingScreen();
    }
  }

  dailyCalChange(value) {
    const jwt = localStorage.getItem('jwt');
    const request = {
      'daily_kcal': value
    };
    this.props.setDailyCal(jwt, request)
    .then( () => {
      return this.props.getMonthReport(jwt, this.props.currentDate);
    })
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');
    setTimeout(this.onLongLoading, 800);
    this.props.getUser(jwt)
    .then(() => {
        return this.props.getLog(jwt, this.props.currentDate);
      })
    .then( () => {
      return this.props.getMonthReport(jwt, this.props.currentDate);
    })
    .then( () => {
      return this.props.getSuggestedFood(jwt);
    })
    .then( () => {
      if (this.props.loading) {
        this.props.hideLoadingScreen()
      } } )
    .catch( error => {
      let err;
      if(error
        && error.payload
        && error.payload.response
        && error.payload.response.data
        && error.payload.response.data.message) {
          err = error.payload.response.data.message;
        }
        else {
         err  = 'Technical error';
        }
      this.props.fetchDashInfoFailure(err);
    } )
  }
  render() {
    const basket = this.props.basket;
    const userInfo = this.props.userInfo;
    const error = this.props.error;
    const loading = this.props.loading;
    const suggestedFood = this.props.suggestedFood;
    if(loading && !error) {
      return (
        <div className='dashboard-spinner'>
         <FontAwesome
          className='fas fa-spinner'
          name='spinner'
          spin
          size='5x' />
        </div>
      )
    } else if (!userInfo && !error && !suggestedFood) {
      return null
    } else if(error) {
       return (
        <div>
         <div>Sorry we are experiencing technical problems. Please try later.</div>
         <div>{error}</div>
        </div>
      )
    } else {
     return <DashboardPanel
     onSignOut={this.onSignOut}
     userInfo={userInfo}
     showBasketModal={this.props.showBasketModal}
     basket={basket}
     dailyCalChange={this.dailyCalChange}
     dailyCalUpSuccess={this.props.dailyCalUpSuccess}
     calLimitError={this.props.calLimitError}/>
    }

  }
}


const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    getUser: jwt => dispatch(getUser(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchUserObjectSuccess(response.payload.data));
      } ),
    getSuggestedFood: jwt => dispatch(getSuggestedFood(jwt))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(fetchSuggestedFoodSuccess(response.payload.data));
    } ),
    getLog: (jwt, currentDate) => dispatch(getFoodLog(jwt, currentDate))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
      dispatch(getFoodLogSuccess(response.payload.data.foods));
    } ),
    getMonthReport: (jwt, currentDate) => dispatch(getMonthReport(jwt, currentDate))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
        dispatch(getMonthReportSuccess(response.payload.data.dates));
      } ),
    fetchDashInfoFailure: (error) => dispatch(fetchDashInfoFailure(error)),
    showLoadingScreen: () => dispatch(showLoadingScreen()),
    hideLoadingScreen: () => dispatch(hideLoadingScreen()),
    showBasketModal: modalType => dispatch(showModal(modalType)),
    setDailyCal: (jwt, user) => dispatch(setDailyCal(jwt, user))
      .then(response => {
        if (!response.error) {
          dispatch(setDailyCalSuccess(response.payload.data));
          setTimeout(() => { dispatch(setDailyCalNoteRemove()) }, 3000);
        } else {
          dispatch(setDailyCalFailure(response.payload.response.data.message));
          setTimeout(() => { dispatch(setDailyCalNoteRemove()) }, 3000);
        }
      })
  }
}

const mapStateToProps = state => ({
  userInfo: state.dash.userInfo,
  suggestedFood: state.dash.suggestedFood,
  error: state.dash.error,
  calLimitError: state.dash.calLimitError,
  loading: state.dash.loading,
  dailyCalUpSuccess: state.dash.dailyCalUpSuccess,
  currentDate: state.dates.currentDate,
  basket: state.basket
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
