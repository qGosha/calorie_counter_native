import React from "react";
import {
  Panel,
  ProgressBar
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import { round } from '../helpers/help_functions';



export const ProgressPanel = ({ value, now, currentDateLimit, currentDate}) => {
  if(!value) value = 0;
  if (!now) now = 0;
  if (currentDateLimit &&
    new Date(currentDate).getDate() !== new Date().getDate()) value = currentDateLimit;

  const rest = round(value - now);
  const valueStyle = { fontWeight: 'bold'};
  const descrStyle = {
    fontSize: '1.2rem',
    color: '#999'
    }
    const barStyle = {
    margin: '0 5px 10px 5px'
}

 return(
   <Panel style={{ backgroundColor: '#eee'}}>
     <Row style={{ padding: '15px 5px 5px' }}>
    <Col style={{textAlign: 'left'}}>
         <div style={valueStyle}>{round(now)}</div>
      <div style={descrStyle}>Cal intake</div>
    </Col>
    <Col style={{textAlign: 'right'}}>
         <div style={valueStyle}>{rest}</div>
      <div style={descrStyle}>
           {(value - now) > 0 ? 'Cal remaining' : 'Cal over'}
      </div>
    </Col>
   </Row>
   <ProgressBar
     striped
     bsStyle={now <= value ? 'success' : 'danger'}
     now={round(now)}
     style={barStyle}
     max={round(value)}/>
   </Panel>
 )
}
