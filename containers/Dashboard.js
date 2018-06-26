import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Font } from 'expo';
import { DashboardPanel } from '../components/dashboardPanel';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard,AsyncStorage } from 'react-native';
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
  setDailyCal,
  setDailyCalSuccess,
  setDailyCalFailure,
  setDailyCalNoteRemove,
  getMonthReport,
  getMonthReportSuccess,
  dashboardLoaded
} from "../actions/index";

class Dashboard extends Component {
constructor(props) {
  super(props);
  this.onSignOut = this.onSignOut.bind(this);
  this.onLongLoading = this.onLongLoading.bind(this);
  this.dailyCalChange = this.dailyCalChange.bind(this);
}

  onSignOut() {
    AsyncStorage.removeItem('jwt', () => this.props.signOutUser()).catch(er => {
    Actions.error({title: 'Data fetch failed', text: er})
  })
  }
  onLongLoading() {
    if (!this.props.suggestedFood) {
      this.props.showLoadingScreen();
    }
  }

  dailyCalChange(value) {
    const jwt = this.props.jwt;
    const request = {
      'daily_kcal': value
    };
    this.props.setDailyCal(jwt, request)
    .then( () => {
      return this.props.getMonthReport(jwt, this.props.currentDate);
    })
  }

  componentDidMount() {
    this.props.hideLoadingScreen()
    // setTimeout(this.onLongLoading, 600);
    // const jwt = this.props.jwt;
    // const currentDate = this.props.currentDate;
    // this.props.getUser(jwt)
    // .then(() => {
    //     return this.props.getLog(jwt, currentDate);
    //   })
    // .then( () => {
    //   return this.props.getMonthReport(jwt, currentDate);
    // })
    // .then( () => {
    //   return this.props.getSuggestedFood(jwt);
    // })
    // .then( () => { this.props.hideLoadingScreen() } )
    // .catch( er => {
    //   const message = er && er.response && er.response.data.message || 'Error';
    //   Actions.error({title: 'Data fetch failed', text: message})
    //   this.props.fetchDashInfoFailure(message);
    // } )
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
  loaded: state.dash.loaded,
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
