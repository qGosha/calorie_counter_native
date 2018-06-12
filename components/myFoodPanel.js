import React from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import {
  ListGroup
} from 'react-bootstrap';

export const MyFoodPanel = ({ suggestedFood, addToBasket }) => {
  const foodArr = suggestedFood.foods;
  if (!foodArr || !foodArr.length) return null;
  const foods = foodArr.slice(0,5);

  return(
    <ListGroup id='dropdown-menu'>
      <h5 className='food-group-title'>My Food</h5>
     <FoodListItem foods={foods} addToBasket={addToBasket}/>
    </ListGroup>
  )
}
