import React from "react";
import { BASKET } from '../containers/Modal';
import {
 Panel
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import FontAwesome from 'react-fontawesome';
import { CalorieLimit } from '../components/calorieLimit';
import SearchBar from '../containers/search-bar';
import DatePicker from '../containers/DatePicker';
import FoodLog from '../containers/FoodLog';
import '../style/dashboard.css';


export const DashboardPanel = ({
  onSignOut,
  userInfo,
  showBasketModal,
  dailyCalChange,
  calLimitError,
  dailyCalUpSuccess,
  basket}) => {
    return (
     <Container fluid style={{padding: '0'}}>
      <Panel>
          <Row nogutter style={{ justifyContent: 'center' }}>
       <Col xs={8} sm={9}>
          <h3 style={{ fontFamily: 'Oleo Script', paddingLeft: '15px'}}>Hello, {userInfo.first_name}. This is your Food log</h3>
       </Col>
       <Col xs={4} sm={3} style={{ alignSelf: 'center', textAlign:'center' }}>
      <Row nogutter style={{ justifyContent: 'space-between' }}>
      <Col>
       <span
         onClick={() => showBasketModal(BASKET)}
         className='fa-stack'
         style={{cursor: 'pointer'}}>
       <FontAwesome
        className='fas fa-shopping-basket fa-stack-2x'
        name='shopping-basket'
        style={{color: basket.length ? 'green' : 'grey'}}
        size='2x' />
       <span
        className="fa-stack fa-stack-1x"
        style={{display:basket.length ? 'block' : 'none'}}>
         <FontAwesome
          className='fa fa-circle fa-stack-1x'
          name='circle'
          style={{color: 'red',
           fontSize: '20px',
           top: '-5px',
           left: '5px'}} />
          <span
           className='fa fa-stack-1x fa-inverse'
           style={{
            top: '-5px',
            left: '5px'}}
           name='inverse'>{basket.length}</span>
       </span>
       </span>
       </Col>
      <Col style={{paddingLeft: '0'}}>
       <FontAwesome
         onClick={onSignOut}
         className='fas fa-sign-out-alt'
         name='sign-out'
         style={{ color: 'green', cursor: 'pointer' }}
         size='2x' />
       </Col>
         </Row>
         </Col>
        </Row>
       </Panel>

       <SearchBar/>
       <Row nogutter style={{ justifyContent: 'center' }}>
       <Col xs={12} md={6}>
       <Panel>
         <Panel.Heading>Track Calendar</Panel.Heading>
          <Panel.Body>
          <Row style={{justifyContent:'center'}}>
           <DatePicker />
           </Row>
          </Panel.Body>
       </Panel>
       </Col>
       </Row>
       <Row nogutter style={{ justifyContent: 'center' }}>
         <Col xs={12} md={6}>
      <CalorieLimit
        value={userInfo['daily_kcal']}
        onClick={dailyCalChange}
        dailyCalUpSuccess={dailyCalUpSuccess}
        calLimitError={calLimitError} />
         </Col>
       </Row> 
       <Row nogutter style={{ justifyContent: 'center' }}>
       <Col xs={12} md={8}>
        <FoodLog
          value={userInfo['daily_kcal']}/>
       </Col>
      </Row>  
      </Container>
      )
}
