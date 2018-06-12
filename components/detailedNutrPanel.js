import React from 'react';

import '../style/nutr_details.css';
import { Container, Row, Col } from 'react-grid-system';
import { Image } from 'react-bootstrap';
import { fixed, round, getFullNutrition } from '../helpers/help_functions';

export const DetailedNutrPanel = ({ foodObj, dailyCal, isFromBasket }) => {

  const getNutrition = (nutr) => {
    return getFullNutrition(nutr, foodObj);
  }
  const qty =  foodObj.serving_qty;
  const value = (foodObj.value === undefined || isNaN(parseInt(foodObj.value)) || isNaN(foodObj.value))
  ? qty : foodObj.value;

  const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const dailyCalMult = dailyCal / 2000;
  const servingUnit = foodObj.serving_unit;
  const foodName = foodObj.food_name;
  const servingWeight = round(foodObj.current_serving_weight || foodObj.serving_weight_grams);
  const brandName = foodObj.brand_name ? <p className='nutr-brand-name'>{foodObj.brand_name}</p> : null;

  const multiplier = (value / qty) || 0;
  const servingWeightGram = servingWeight * multiplier;

  const calorie = round(getNutrition(208));
  const fat = fixed(getNutrition(204));
  const calorieFromFat = round(fat * 9);
  const satFat = fixed(getNutrition(606));
  const sodium = round(getNutrition(307));
  const totalCarbs = round(getNutrition(205));
  const protein = round(getNutrition(203));

  const satFatDVP = round((round(satFat * 9) / (170 * dailyCalMult)) * 100);
  const fatDVP = round((calorieFromFat / (600 * dailyCalMult)) * 100);
  const sodiumDVP = round((sodium / 2300) * 100);
  const totalCarbsDVP = round((totalCarbs / (300 * dailyCalMult)) * 100);


  const transFat = fixed(getNutrition(605));
  const polysatFat = fixed(getNutrition(646));
  const monosatFat = fixed(getNutrition(645));
  const cholesterol = round(getNutrition(601));
  const cholesterolDVP = round((cholesterol / 300) * 100);
  const potassium = round(getNutrition(306));
  const potassiumDVP = round((potassium / 4250) * 100);
  const dietFiber = fixed(getNutrition(291));
  const dietFiberDVP = round(( dietFiber / ((dailyCal/1000) * 14) ) * 100);
  const sugar = fixed(getNutrition(269));
  const sugarDVP = round((sugar / (30 * dailyCalMult)) * 100);
  const vitaminAsum = fixed(getNutrition(320));
  const vitaminCsum = fixed(getNutrition(401));
  const calciumSum = fixed(getNutrition(301));
  const ironSum = fixed(getNutrition(303));
  const vitaminA = round((vitaminAsum / (900 * dailyCalMult)) * 100);
  const vitaminC = round((vitaminCsum / (90 * dailyCalMult)) * 100);
  const calcium = round((calciumSum / (1300 * dailyCalMult)) * 100);
  const iron = round((ironSum / (18 * dailyCalMult)) * 100);
 
  const basketSection = (
      <Row nogutter style={{padding: '10px'}}>
       <Col>
        <Image
         src={foodObj.photo ? foodObj.photo.thumb : foodAvatarUrl}
         className='nutr-image'
         rounded
         alt='food'/>
       </Col>
       <Col>
       <div className='nutr-name'>{foodName}</div>
       {brandName}
       </Col>
     </Row>
    )
  const foodNameRow = (
    <Row nogutter>
     <Col>{foodName}</Col>
    </Row>
  )
  const servingSizeRow  = (
    <Row nogutter>
     <Col className='nutr-table-servunit'>Serving size: {value} {servingUnit} ({servingWeightGram}g)</Col>
    </Row>

  )
  const perServingRow = (
     <Col>Amount Per Serving</Col>
  )
  return(
    <Container fluid>
    { isFromBasket ? basketSection : null }
    <Row nogutter style={{padding: '10px', justifyContent:'center'}}>
     <Col xs={12} sm={8} md={6}  className='nutr-table-container'>
     <Row nogutter>
      <Col className='nutr-table-heading'>Nutrition Facts</Col>
     </Row>
      { isFromBasket ? foodNameRow : null }
      { isFromBasket ? servingSizeRow : null }
     <Row nogutter className='nutr-line line-perserving nutr-line-divider'>
      { isFromBasket ? perServingRow : <span></span> }
      </Row>
     <Row nogutter className='nutr-line' style={{borderTop: isFromBasket ? '1px solid #222' : 'none'}}>
      <Col><strong>Calories</strong> {calorie}</Col>
      <Col xs={7} className='nutr-col-right'>Calories from Fat {calorieFromFat}</Col>
     </Row>
     <Row nogutter className='nutr-bar-row'>
      <Col className='nutr-col-right'><strong>% Daily Value*</strong></Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}><strong>Total Fat </strong>{fat}g</Col>
      <Col className='nutr-col-right'><strong>{fatDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col xs={9}>Saturated Fat {satFat}g</Col>
      <Col className='nutr-col-right'><strong>{satFatDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col>Trans Fat {transFat}g</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col>Polyunsaturated Fat {polysatFat}g</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col>Monounsaturated Fat {monosatFat}g</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}><strong>Cholesterol </strong>{cholesterol}mg</Col>
      <Col className='nutr-col-right'><strong>{cholesterolDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}><strong>Sodium </strong>{sodium}mg</Col>
      <Col className='nutr-col-right'><strong>{sodiumDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}><strong>Potassium </strong>{potassium}mg</Col>
      <Col className='nutr-col-right'><strong>{potassiumDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={10}><strong>Total Carbohydrates </strong>{totalCarbs}g</Col>
      <Col className='nutr-col-right'><strong>{totalCarbsDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col xs={8}>Dietary Fiber {dietFiber}g</Col>
      <Col className='nutr-col-right'><strong>{dietFiberDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line-indent'>
      <Col xs={7}>Sugars {sugar}g</Col>
      <Col className='nutr-col-right'><strong>{sugarDVP}</strong>%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col><strong>Protein </strong>{protein}g</Col>
     </Row>
     <Row nogutter className='nutr-line nutr-line-divider'>
      <Col xs={7}>Vitamin A</Col>
      <Col className='nutr-col-right'>{vitaminA}%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}>Vitamin C</Col>
      <Col className='nutr-col-right'>{vitaminC}%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}>Calcium</Col>
      <Col className='nutr-col-right'>{calcium}%</Col>
     </Row>
     <Row nogutter className='nutr-line'>
      <Col xs={7}>Iron</Col>
      <Col className='nutr-col-right'>{iron}%</Col>
     </Row>
     <Row nogutter className='nutr-line nutr-bottom-text'>
      <Col>
       <span>* Percent Daily Values are based on a {dailyCal} calorie diet.</span>
      </Col>
     </Row>
     </Col>
    </Row>
    </Container>
  )
}
