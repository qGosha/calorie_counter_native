import React from 'react';
import { connect } from 'react-redux';
import { LogFoodPanel } from '../components/logFoodPanel';
import { ProgressPanel } from '../components/progressPanel';
import { totalNutrients } from '../helpers/help_functions';
import { View } from 'react-native';

const FoodLog = props => {

    const foods = props.loggedFood;
    const newDailyNutr = (period) => {
      if(!period || !period.length) return false;
      return {
        full_nutrients: totalNutrients(period)
      }
    }
    const dailyCal = props.dailyCal;
    const totalDailyNutr = newDailyNutr(foods);
    const totalDailyCal = totalDailyNutr['full_nutrients'] ? totalDailyNutr['full_nutrients']
    .filter( a => a['attr_id'] === 208)[0]['value'] : 0;

    return (
      <View style={{flex: 1}}>
       <ProgressPanel
       value={dailyCal}
       now={totalDailyCal}
       currentDateLimit={props.currentDateLimit}
       currentDate={props.currentDate}
       foods={foods}
       totalDailyNutr={totalDailyNutr}
       dailyCal={dailyCal}/>

      <LogFoodPanel
      foods={foods}
      dailyCal={dailyCal} />
    </View>
    )
}

const mapStateToProps = state => ({
  loggedFood: state.foodLog.log,
  currentDateLimit: state.dates.currentDateLimit,
  currentDate: state.dates.currentDate,
  dailyCal: state.dash.userInfo["daily_kcal"]
});
export default connect(mapStateToProps, null)(FoodLog);
