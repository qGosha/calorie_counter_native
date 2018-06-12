import React from "react";
import { Container, Row, Col } from 'react-grid-system';
import '../style/total_panel.css';
import { INTAKELOG } from '../containers/Modal';
import { totalNutrElem } from '../helpers/help_functions';
export const TotalPanel = ({ foods, isFromLog, showModal, totalDailyNutr }) => {


    const totalCalories = totalNutrElem(208, foods);
    const totalProtein = totalNutrElem(203, foods);
    const totalCarbs = totalNutrElem(205, foods);
    const totalFat = totalNutrElem(204, foods);
    const totalSodium = totalNutrElem(307, foods);
    return (
      <Row
      nogutter
      style={{cursor: isFromLog ? 'pointer' : 'auto'}}
      onClick={ () =>  isFromLog ?
        showModal(INTAKELOG, { foods: totalDailyNutr, title: 'Daily', lessInfo: true }) : false }>
        <Col xs={12}>
         <Row nogutter className='calorie-total-row'>
           <span>Totat calories: </span>
           <span className='total-nutritient'>{totalCalories}</span>
         </Row>
        </Col>
        <Col xs={12}>
         <Row nogutter className='nutrient-total-row'>
          <Col xs={3} className='total-description-group'>
           <span>Protein: </span>
           <span className='total-nutritient'>{totalProtein}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Carbs: </span>
          <span className='total-nutritient'>{totalCarbs}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Fat:</span>
          <span className='total-nutritient'>{totalFat}g</span>
          </Col>
          <Col xs={3} className='total-description-group'>
          <span>Sodium: </span>
          <span className='total-nutritient'>{totalSodium}mg</span>
          </Col>
         </Row>
        </Col>
      </Row>
     )
    }
