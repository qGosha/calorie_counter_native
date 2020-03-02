import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Localization from 'expo-localization';
import { DashboardPanel } from '../components/dashboardPanel';
import { fetchFromStorage } from '../helpers/help_functions';
import { View, } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
  getMonthReport,
  getMonthReportSuccess,
  setNewBasket,
  setTimezone,
  startDashLoading
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onLongLoading = this.onLongLoading.bind(this);
}

  onLongLoading() {
    if (!this.props.loaded) {
      this.props.showLoadingScreen();
    }
  }


  componentDidMount() {
    setTimeout(this.onLongLoading, 600);
    const jwt = this.props.jwt;
    const currentDate = this.props.currentDate;
    Promise.resolve(this.props.startDashLoading())
    .then(() => {
      if(this.props.userInfo) {
        return Promise.resolve();
      }
      return this.props.getUser(jwt)
    })
    .then(() => {
      const timezone = this.props.timezone || Localization.timezone
      return Promise.resolve(timezone);
    })
    .then( (timezone) => {
      if(!this.props.timezone) {
        this.props.setTimezone(timezone);
      }
      return this.props.getSuggestedFood(jwt);
    })
    .then(() => this.props.getLog(jwt, currentDate))
    .then(() => fetchFromStorage('basket'))
    .then(response => {
      const basket = response ? JSON.parse(response) : [];
      return Promise.resolve(this.props.setNewBasket(basket));
    })
    .then(() => this.props.getMonthReport(jwt, currentDate))
    .then(() => this.props.hideLoadingScreen())
    .catch( er => {
      const message = er && er.response && er.response.data.message || 'Error';
      Actions.error({title: 'Data fetch failed', text: message})
      this.props.fetchDashInfoFailure(message);
    } )
  }
  render() {
    const basket = this.props.basket;
    const userInfo = this.props.userInfo;
    const error = this.props.error;
    const loading = this.props.loading;
    const loaded = this.props.loaded;
    const suggestedFood = this.props.suggestedFood;
    if(loading) {
      return (
      <View style={{ flex: 1 }}>
        <Spinner visible={true} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
      )
    } else if(!loading && !loaded) {
      return null;
    } else {
     return  <DashboardPanel
     userInfo={userInfo}
     showBasketModal={this.props.showBasketModal}
     basket={basket}
     dailyCalChange={this.dailyCalChange}
     dailyCalUpSuccess={this.props.dailyCalUpSuccess}
     calLimitError={this.props.calLimitError}
     currentDate={this.props.currentDate}/>
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
    setNewBasket: (basket) => dispatch(setNewBasket(basket)),
    hideLoadingScreen: () => dispatch(hideLoadingScreen()),
    startDashLoading: () => dispatch(startDashLoading()),
    showBasketModal: modalType => dispatch(showModal(modalType)),
    setTimezone: timezone => dispatch(setTimezone(timezone)),
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
  loaded: state.dash.loaded,
  timezone: state.dash.timezone,
  jwt: state.auth.jwt,
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
