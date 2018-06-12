import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button,
  Alert
} from 'react-bootstrap';
import {
  clearError
} from "../actions/index";

class ErrorHandle extends Component {
 render() {
   const clearError = this.props.clearError;
   const dateError = this.props.dateError;
   const foodLogError = this.props.foodLogError;
   const foodSearchError = this.props.foodSearchError;
   const checkArr = [ dateError, foodLogError, foodSearchError ];
   const bool = checkArr.filter(i => i);
   if(!bool.length) return null;
   return(
     <Alert bsStyle="danger" onDismiss={clearError} 
     style={{
       position: 'fixed', 
       top: '0', 
       width: '100%', 
       zIndex:'1000',
       margin: '0 -15px'}}>
       <h4>Error code: {bool[0].status}</h4>
       <p>
         { bool[0].statusText }
          </p>
       <p>
         <Button onClick={clearError}>Hide Alert</Button>
       </p>
     </Alert>
   )
 }
}

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => dispatch(clearError())
  }
}

const mapStateToProps = state => ({
  dateError: state.dates.error,
  foodLogError: state.foodLog.error,
  foodSearchError: state.foodSearch.error
});
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandle);
