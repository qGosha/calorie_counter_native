import React from 'react';
import '../style/show_search_result.css';
import {
  ListGroupItem,
  Image,
  FormControl
} from 'react-bootstrap';
import { INTAKELOG } from '../containers/Modal';
import { round, getFullNutrition } from '../helpers/help_functions';

export const FoodListItem = ({ foods, addToBasket, showModal, onQtyChange }) => {
  if(!foods || !foods.length) return null;
    const foodAvatarUrl = 'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';

    const myFood = foods.map((foodItem, i) => {
      const foodName = foodItem.food_name;
      const brandName = foodItem.brand_name || '';
      const servingQty = foodItem.serving_qty || '';
      const servingUnit = foodItem.serving_unit || '';
      const calorie = foodItem.full_nutrients ? round(getFullNutrition(208, foodItem)) : 0;
      const ifCaloried = foodItem.hasOwnProperty('nf_calories');
      const clickFunc = () => {
        if (showModal) {
          showModal(INTAKELOG, { foods: foodItem, title: 'Edit food'})
        } else {
          addToBasket ? addToBasket(foodItem) : false;
        }
        }
      const style = {
        cursor: (!showModal && !addToBasket) ? 'default' : 'pointer'
      }
      const inputStyle = {
        maxWidth: '70px',
        textAlign: 'center'
      }
      const listGroup = <div className='food-description-group-1'>
        <span className='food-name'>{foodName} </span>
        <span className='food-size'>{`${brandName ? brandName + ',' : ''} ${servingQty} ${servingUnit}`}</span>
      </div>;

      const qty = (!showModal && !addToBasket) ? <span><FormControl
        type="text"
        style={inputStyle}
        value={servingQty}
        onChange={(event) => onQtyChange(event)} /> {servingUnit}  {foodName}</span> : listGroup;

      const AdjustElement = ({...props}) => (!showModal && !addToBasket) ? <div {...props}/> : <ListGroupItem {...props}/>;
      return  (
        <AdjustElement
          key={foodItem.id}
          style={style}
          className='food-item'
          onClick={() => clickFunc()}>
          <Image src={ foodItem.photo.thumb || foodAvatarUrl }
          alt='food'
          className='food-image'
          />
          <div className='food-description'>
          {qty}
           { ifCaloried ? <div className='food-description-group-2'>
            <span className='food-calorie'>{calorie}</span>
            <span className='food-calorie-name'>cal</span>
          </div>: null }
          </div>
         </AdjustElement>
      )
    })

  return myFood;
}
