import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TotalPanel } from '../components/totalPanel';
import { LogFoodPanel } from '../components/logFoodPanel';
import { ProgressPanel } from '../components/progressPanel';
import {
 showModal
} from "../actions/index";
import { totalNutrients, total, getFullNutrition } from '../helpers/help_functions';


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
    const totalDailyNutr = newDailyNutr(foods);
    const totalDailyCal = totalDailyNutr['full_nutrients'] ? totalDailyNutr['full_nutrients']
    .filter( a => a['attr_id'] === 208)[0]['value'] : 0
    return (
  <div>
    <ProgressPanel
    value={this.props.value}
    now={totalDailyCal}
    currentDateLimit={this.props.currentDateLimit}
    currentDate={this.props.currentDate}/>
    <TotalPanel
    foods={foods}
    showModal={this.props.showModal}
    isFromLog={true}
    totalDailyNutr={totalDailyNutr}
 />

    <LogFoodPanel
    foods={foods}
    showModal={this.props.showModal} />
  </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps))
  }
}

const mapStateToProps = state => ({
  loggedFood: state.foodLog.log,
  currentDateLimit: state.dates.currentDateLimit,
  currentDate: state.dates.currentDate
});
export default connect(mapStateToProps, mapDispatchToProps)(FoodLog);
