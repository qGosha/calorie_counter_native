import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  Panel,
  Alert
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
export class CalorieLimit extends Component {
  constructor(props){
    super(props);
    this.state = {
       value: this.props.value
    }
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(event) {
    const value = event.target.value;
    this.setState({value});
  }
 render() {
   const updateStatus = this.props.dailyCalUpSuccess ?
     <Alert bsStyle="success">
       <div>Daily calorie limit has been updated</div>
   </Alert> : null;
   const error = this.props.calLimitError ?
     <Alert bsStyle="danger">
       <div>{this.props.calLimitError}</div>
     </Alert> : null;
  return(

   <Panel>
     <Panel.Heading>Your daily limit</Panel.Heading>
     <Panel.Body>
       <Row nogutter>
      <Col xs={5}>
        <FormGroup>
         <FormControl
           type="text"
           value={this.state.value}
           autoComplete="off"
           onChange={this.onValueChange}
         />
        </FormGroup>
       </Col>
       <Col xs={7}>
       <Button
         style={{marginLeft:'15px'}}
         onClick={() => this.props.onClick(+this.state.value)}>
         Save</Button>
        </Col>
        </Row>
        {updateStatus}
        {error}
     </Panel.Body>
   </Panel>

 )
}
}
