import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import {
  getMonthReport,
  getMonthReportSuccess,
  getMonthReportFailure,
  getFoodLogSuccess,
  changeCurrentDate,
  getFoodLog,
  setCurrentDateCalLimit
} from "../actions/index";
import { Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state={
      green: [],
      red: []
    }
  }

  onDateChange = date => {
    console.log(date);
    const jwt = this.props.jwt;
    const dates = this.props.dates;
    const dateArr = dates.filter(i => i['date'] === date.dateString);
    const newLimit = (dateArr && dateArr.length) ? dateArr[0]['daily_kcal_limit'] : null;
      this.props.setCurrentDateCalLimit(newLimit)
      this.props.changeCurrentDate(date.dateString)
      Actions.dashboard();
  }

  onMonthChange = (date) => {
    const jwt = this.props.jwt;
    this.props.getMonthReport(jwt, date.dateString);
    this.props.changeCurrentDate(date.dateString)
  }

  render() {
    const dates = this.props.dates;
    let green;
    let red;
    if (!dates || !dates.length) {
      green = [];
      red = [];
    } else {
       green = dates.map(i => {
        if (i['total_cal'] && i['total_cal'] <= i['daily_kcal_limit']) {
          return i['date'];
        }
      })
       red = dates.map(i => {
        if (i['total_cal'] && i['total_cal'] > i['daily_kcal_limit']) {
          return i['date'];
        }
      })
    }

    const greenD = green.length ?  green.filter( i => i).reduce( (res, c ) => {
      if(c) {
        res[c] = {selected: true, selectedColor: 'green'};
        return res;
      }
    }, {}) : {};
    const redD = red.length ? red.filter( i => i).reduce( (res, c) => {
      if(c) {
        res[c] = {selected: true, selectedColor: 'red'};
        return res;
      }
    }, {}): {};
    const markedDates = {
      ...greenD,
      ...redD,
      [this.props.currentDate]: {selected: true, selectedColor: 'blue'},
    };
    return (
      <View>
       <Calendar
        markedDates={{...markedDates}}
        current={this.props.currentDate}
        onPressArrowLeft={substractMonth => substractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        onDayPress={(date) => this.onDateChange(date)}
        monthFormat={'MMM yyyy'}
        onMonthChange={(month) => this.onMonthChange(month)}
        hideArrows={false}
        hideExtraDays={true}
        firstDay={1}
       />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  currentDate: state.dates.currentDate,
  dates: state.dates.dates,
  jwt: state.auth.jwt,
});

const mapDispatchToProps = dispatch => {
  return {
    getMonthReport: (jwt, date) => dispatch(getMonthReport(jwt, date))
     .then( response => {
       if(response.error) {
         return Promise.reject(response);
       }
         dispatch(getMonthReportSuccess(response.payload.data.dates))
      } ),
      getLog: (jwt, date) => dispatch(getFoodLog(jwt, date))
       .then( response => {
         if(response.error) {
           return Promise.reject(response);
         }
        dispatch(getFoodLogSuccess(response.payload.data.foods));
      } ),
      changeCurrentDate: date => dispatch(changeCurrentDate(date)),
      setCurrentDateCalLimit: limit => dispatch(setCurrentDateCalLimit(limit))
};
}

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
