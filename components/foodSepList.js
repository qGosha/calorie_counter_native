import React from 'react';
import '../style/show_search_result.css';
import { FoodListItem } from '../components/foodListItem';
import {
  ListGroup
} from 'react-bootstrap';

export const SepFoodList = ({ foods, addToBasket, title }) => {
  if(!foods.length) {
    return (
      <ListGroup className='food-sep-list'>
       <span>There is nothing to show at the moment...</span>
      </ListGroup>
    )
  }
  return (
    <ListGroup className='food-sep-list'>
      <h5 className='food-group-title'>{ title }</h5>
      <FoodListItem foods={foods} addToBasket={addToBasket}/>
    </ListGroup>
  )
}
