import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { TotalPanel } from '../components/totalPanel';
import { LogFoodPanel } from '../components/logFoodPanel';
import { ProgressPanel } from '../components/progressPanel';
import { totalNutrients, total, getFullNutrition } from '../helpers/help_functions';
import { StyleSheet, View } from 'react-native';

class FoodLog extends Component {
constructor(props) {
  super(props);
}

  render() {
    const foods = this.props.loggedFood;
    const newDailyNutr = (period) => {
      if(!period || !period.length) return false;
      return {
        full_nutrients: totalNutrients(period)
      }
    }
    const dailyCal = this.props.dailyCal;
    const totalDailyNutr = newDailyNutr(foods);
    const totalDailyCal = totalDailyNutr['full_nutrients'] ? totalDailyNutr['full_nutrients']
    .filter( a => a['attr_id'] === 208)[0]['value'] : 0
    return (
   <View style={{flex: 1}}>
     <ProgressPanel
     value={dailyCal}
     now={totalDailyCal}
     currentDateLimit={this.props.currentDateLimit}
     currentDate={this.props.currentDate}
     foods={foods}
     totalDailyNutr={totalDailyNutr}
     dailyCal={dailyCal}/>

    <LogFoodPanel
    foods={foods}
    dailyCal={dailyCal} />
  </View>

//     <TotalPanel
//     foods={foods}
//     showModal={this.props.showModal}
//     isFromLog={true}
//     totalDailyNutr={totalDailyNutr}
// />

    )
  }
}



const mapStateToProps = state => ({
  loggedFood: state.foodLog.log,
  currentDateLimit: state.dates.currentDateLimit,
  currentDate: state.dates.currentDate,
  dailyCal: state.dash.userInfo["daily_kcal"]
});
export default connect(mapStateToProps, null)(FoodLog);
