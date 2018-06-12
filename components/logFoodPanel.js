import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import {
  ListGroup,
  Panel,
  Popover,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { FoodListItem } from '../components/foodListItem';
import FontAwesome from 'react-fontawesome';
import { INTAKELOG } from '../containers/Modal';
import { totalNutrients, total, totalNutrElem } from '../helpers/help_functions';


export const LogFoodPanel = ({ foods, showModal }) => {

  const totalPeriodNutr = (period) => {
    if(!period || !period.length) return false;
    return {
      full_nutrients: totalNutrients(period)
    }
  }
  const intake = (arr, term, time1, time2) => {
    return foods.filter( (item,i) => {
      const consumed = new Date(item.consumed_at).getHours();
      let condition;
      switch(term) {
        case 'snacks':
          condition = ((consumed >= 21 && consumed < 23) || (consumed >= 0 && consumed < 6))
          break;
        default:
          condition = (consumed >= time1 && consumed < time2);
      }
      if (condition) return item;
    })
  }


  const breakfast = intake(foods, 'breakfast', 6, 12);
  const lunch = intake(foods, 'lunch', 12, 17);
  const dinner = intake(foods, 'dinner', 17, 21);
  const snacks = intake(foods, 'snacks');

  const breakfastCal = totalNutrElem(208, breakfast);
  const lunchCal = totalNutrElem(208, lunch);
  const dinnerCal = totalNutrElem(208, dinner);
  const snacksCal = totalNutrElem(208, snacks);


  const totalIntake = {
    Breakfast: totalPeriodNutr(breakfast),
    Lunch: totalPeriodNutr(lunch),
    Dinner: totalPeriodNutr(dinner),
    Snacks: totalPeriodNutr(snacks)
  }

  const headStyle = {
    padding:'10px 8px',
    textTransform: 'uppercase',
    color: '#222'
  }
  const colStyle = {
    textAlign: 'right'
  }
  const iconStyle ={
    cursor: 'pointer',
    fontSize: '17px',
    marginRight: '10px',
    color: '#837474'
  }

  const tooltip = (obj, name) => {
      return (
        <Tooltip id="tooltip" style={{ display: obj ? 'none': 'auto'}}>
          <strong>No added food for {name}</strong>
        </Tooltip>
      )
};

  const period = (name, totalCal, per) => {
    return (
      <Panel bsStyle="success" style={{margin:'0'}}>
        <Panel.Heading style={headStyle}>
        <Row nogutter>
         <Col xs={9}>{name}</Col>
         <Col style={colStyle} xs={3}>
           <Row nogutter style={{justifyContent:'space-between'}}>
            <Col xs={5}>
            <OverlayTrigger
            onClick={ () =>
              totalIntake[name] ? showModal(INTAKELOG, { foods: totalIntake[name], title: name, lessInfo: true}) : false }
            placement="top"
            triger='hover'
            overlay={tooltip(totalIntake[name], name)}
            >
             <FontAwesome
               style={iconStyle}
               name='info-circle' />
            </OverlayTrigger>
            </Col>
            <Col xs={7}>
             {totalCal}
            </Col>
           </Row>
         </Col>
        </Row>
        </Panel.Heading>
        <ListGroup>
          <FoodListItem
          foods={per}
          showModal={showModal}/>
        </ListGroup>
      </Panel>
    )
  }
  return (
    <Container fluid className='food-log-panel'>
     { period('Breakfast', breakfastCal, breakfast) }
     { period('Lunch', lunchCal, lunch) }
     { period('Dinner', dinnerCal, dinner) }
     { period('Snacks', snacksCal, snacks) }
    </Container>
  )
}
