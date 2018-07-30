import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Input,
  View,
  Button,
  Text,
  Content,
} from 'native-base';
import { StyleSheet } from 'react-native';
import {
  setDailyCal,
  setDailyCalSuccess,
  setDailyCalFailure,
  setDailyCalNoteRemove,
  getMonthReport,
  getMonthReportSuccess,
} from "../actions/index";

class CalorieLimit extends Component {
  constructor(props){
    super(props);
    this.state = {
       value: this.props.userInfo['daily_kcal']
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.dailyCalChange = this.dailyCalChange.bind(this);
  }
  onValueChange(event) {
    const value = event.nativeEvent.text;
    this.setState({value});
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

 render() {
   const value = this.state.value;
   const updateStatus = this.props.dailyCalUpSuccess ?
     <View style={styles.message}>
       <Text>Daily calorie limit has been updated</Text>
   </View> : null;
   const error = this.props.calLimitError ?
     <View style={[styles.message, {backgroundColor: '#d9534f'}]}>
       <Text>{this.props.calLimitError}</Text>
     </View> : null;
   return(
    <Container>
     <Content>
     <View style={{
       flex: 1,
       paddingVertical: 10
     }}>
     <View style={styles.title}>
    <Text>Your daily limit</Text>
    </View>
      <View style={styles.cont}>
       <Input
       style={styles.input}
       bordered
       value={value.toString()}
       onChange={event => this.onValueChange(event)}
       />
       <Button
          style={styles.button}
          disable={this.props.disableSaveButton}
          onPress={() => this.dailyCalChange(+this.state.value)}>
        <Text>Save</Text>
       </Button>
      </View>
     </View>
     {updateStatus}
           {error}
     </Content>
    </Container>
   )
}
}

const styles = StyleSheet.create({
  input: {
      textAlign: 'center',
      borderWidth:1,
      backgroundColor: '#fff',
      marginRight: 5,
      height: 35,
      width: 70
    },
  button: {
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cont: {
   flex: 1,
   flexDirection: 'row',
   padding: 20
 },
 title: {
  flex: 1,
  flexDirection: 'row',
  padding: 5,
  backgroundColor: '#eee'
},
message: {
  alignSelf: 'center',
  width: 250,
  padding: 20,
  borderRadius: 8,
  backgroundColor: '#5cb85c',
}
});

const mapDispatchToProps = dispatch => {
  return {
    setDailyCal: (jwt, user) => dispatch(setDailyCal(jwt, user))
      .then(response => {
        if (!response.error) {
          dispatch(setDailyCalSuccess(response.payload.data));
          setTimeout(() => { dispatch(setDailyCalNoteRemove()) }, 3000);
        } else {
          dispatch(setDailyCalFailure(response.payload.response.data.message));
          setTimeout(() => { dispatch(setDailyCalNoteRemove()) }, 3000);
        }
      }),
    getMonthReport: (jwt, currentDate) => dispatch(getMonthReport(jwt, currentDate))
       .then( response => {
         if(response.error) {
           return Promise.reject(response);
         }
          dispatch(getMonthReportSuccess(response.payload.data.dates));
        } ),
  }
}
const mapStateToProps = state => ({
  jwt: state.auth.jwt,
  currentDate: state.dates.currentDate,
  userInfo: state.dash.userInfo,
  calLimitError: state.dash.calLimitError,
  dailyCalUpSuccess: state.dash.dailyCalUpSuccess,
  disableSaveButton: state.dash.disableSaveButton
});
export default connect(mapStateToProps, mapDispatchToProps)(CalorieLimit);
