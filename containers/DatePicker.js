import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar'
import {
  getMonthReport,
  getMonthReportSuccess,
  getMonthReportFailure,
  getFoodLogSuccess,
  changeCurrentDate,
  getFoodLog,
  setCurrentDateCalLimit
} from "../actions/index";
import '../style/date_picker.css';

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
    const dates = this.props.dates;
    const dateArr = dates.filter(i => new Date(i['date']).getUTCDate() === new Date(date).getDate());
    const newLimit = (dateArr && dateArr.length) ? dateArr[0]['daily_kcal_limit'] : null;
    const jwt = localStorage.getItem('jwt');
    this.props.getLog(jwt, date)
      .then(() => Promise.resolve(this.props.setCurrentDateCalLimit(newLimit)) )
      .then(() => this.props.changeCurrentDate(date))
      .catch(error => {
        this.props.getMonthReportFailure(error);
      })
  }


  onMonthChange = (date) => {
    const jwt = localStorage.getItem('jwt');
    this.setState({ green: [], red: [] },
      () => this.props.getMonthReport(jwt, date))
  }

  daysColor = ({ date, view }) => {
    const green = this.state.green;
    const red = this.state.red;
    if (view === 'month' && green.includes(date.getDate())) return 'green';
    else if (view === 'month' && red.includes(date.getDate())) return 'red';
    else return null
  }

  render() {
    return(
      <Calendar
       onChange={this.onDateChange}
       value={this.props.currentDate}
       showNeighboringMonth={false}
       className={'custom-calendar'}
       tileClassName={(date, view) => this.daysColor(date, view)}
       onActiveDateChange={value => this.onMonthChange(value['activeStartDate'])}
       onClickMonth={value => this.onMonthChange(value)}
       />
    )
  }

}


const mapStateToProps = state => ({
  currentDate: state.dates.currentDate,
  dates: state.dates.dates
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
