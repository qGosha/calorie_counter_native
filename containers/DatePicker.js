import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
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

 static getDerivedStateFromProps(props, state) {
   const dates = props.dates;
   if (!dates || !dates.length) return {green: [], red: []}
   const green = dates.map(i => {
     if (i['total_cal'] && i['total_cal'] <= i['daily_kcal_limit']) {
       return new Date(i['date']).getUTCDate();
     }
   })
   const red = dates.map(i => {
     if (i['total_cal'] && i['total_cal'] > i['daily_kcal_limit']) {
       return new Date(i['date']).getUTCDate();
     }
   })
   return {green, red}
 }


  onDateChange = date => {
    console.log(date);
    const jwt = this.props.jwt;
    const dates = this.props.dates;
    const dateArr = dates.filter(i => new Date(i['date']).getUTCDate() === date.dateString);
    const newLimit = (dateArr && dateArr.length) ? dateArr[0]['daily_kcal_limit'] : null;
    // this.props.getLog(jwt, date.dateString)
      // .then(() => Promise.resolve(this.props.setCurrentDateCalLimit(newLimit)) )
      // .then(() => Promise.resolve(this.props.setCurrentDateCalLimit(newLimit)) )
      // .then(() => this.props.changeCurrentDate(date.dateString))
      // .catch(error => {
      //   this.props.getMonthReportFailure(error);
      // })
      this.props.setCurrentDateCalLimit(newLimit)
      this.props.changeCurrentDate(date.dateString)
      Actions.dashboard();
  }


  onMonthChange = (date) => {
    const jwt = this.props.jwt;
    this.setState({ green: [], red: [] },
      () => this.props.getMonthReport(jwt, date.dateString))
  }

  daysColor = ({ date, view }) => {
    const green = this.state.green;
    const red = this.state.red;
    if (view === 'month' && green.includes(date.getDate())) return 'green';
    else if (view === 'month' && red.includes(date.getDate())) return 'red';
    else return null
  }

  render() {
    return (
      <View>
       <Calendar
   markedDates={{
     [this.props.currentDate]: {selected: true, selectedColor: 'blue'},
   }}
  current={this.props.currentDate}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  onDayPress={(date) => this.onDateChange(date)}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => onMonthChange(day)}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'MMM yyyy'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={false}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  onPressArrowLeft={substractMonth => substractMonth()}
  // Handler which gets executed when press arrow icon left. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
/>
      </View>
    )
    // return(
    //   <Calendar
    //    onChange={this.onDateChange}
    //    value={this.props.currentDate}
    //    showNeighboringMonth={false}
    //    className={'custom-calendar'}
    //    tileClassName={(date, view) => this.daysColor(date, view)}
    //    onActiveDateChange={value => this.onMonthChange(value['activeStartDate'])}
    //    onClickMonth={value => this.onMonthChange(value)}
    //    />
    // )
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
