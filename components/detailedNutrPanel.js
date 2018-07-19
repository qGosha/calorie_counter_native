import React from 'react';
import { fixed, round, getFullNutrition } from '../helpers/help_functions';
import { Text, Button, View, Container, Content, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import { StyleSheet, Image,  } from 'react-native';

export const DetailedNutrPanel = ({ foodObj, dailyCal }) => {

  const getNutrition = (nutr) => {
    return getFullNutrition(nutr, foodObj);
  }
  const qty = foodObj.serving_qty;
  const value = (foodObj.value === undefined || isNaN(parseInt(foodObj.value)) || isNaN(foodObj.value))
  ? qty : foodObj.value;

  const foodAvatarUrl =
    'https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png';
  const dailyCalMult = dailyCal / 2000;
  const servingUnit = foodObj.serving_unit;
  const foodName = foodObj.food_name;
  const servingWeight = round(
    foodObj.current_serving_weight || foodObj.serving_weight_grams
  );
  const brandName = foodObj.brand_name ? (
    <Text>{foodObj.brand_name}</Text>
  ) : null;

  const multiplier = value / qty || 0;
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
  const dietFiberDVP = round((dietFiber / ((dailyCal / 1000) * 14)) * 100);
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

  const Row = ({
    name,
    qty,
    measure,
    procent,
    addRowStyle,
    addTextStyle,
    noDVP,
    noWeight,
  }) => {
    return (
      <View style={[styles.row, addRowStyle]}>
        <View style={styles.innerRow}>
          <Text style={[styles.text2, addTextStyle]}>{name} </Text>
          {!noWeight && <Text style={styles.text1}>{`${qty}${measure}`}</Text>}
        </View>
        <View style={styles.innerRow}>
          <Text style={styles.text2}>{procent}</Text>
          {!noDVP && <Text style={styles.text1}>%</Text>}
        </View>
      </View>
    );
}
return(
        <View>
          <View style={{ flex: 1, paddingVertical: 8 }}>
           <ListItem avatar>
              <Left>
                <Thumbnail square source={{ uri: foodObj.photo ? foodObj.photo.thumb : foodAvatarUrl }} />
              </Left>
              <Body style={{borderBottomWidth: 0}}>
                <Text>{foodName}</Text>
                <Text note>{value} {servingUnit} {!!servingWeightGram && '(' +  servingWeightGram + 'g)' }</Text>
              </Body>
              <Right style={{borderBottomWidth: 0}}>
                <Text style={{color: 'green'}}>{calorie}</Text>
                <Text note>cal</Text>
              </Right>
            </ListItem>
          </View>
        <View style={{ borderWidth: 1, padding: 12 }}>
          <View
            style={[styles.row, { borderTopWidth: 8, borderBottomWidth: 4 }]}>
            <View style={styles.innerRow}>
              <Text style={styles.text2}>Calories </Text>
              <Text style={styles.text1}>{calorie}</Text>
            </View>
            <View style={styles.innerRow}>
              <Text style={styles.text2}>Calories from Fat </Text>
              <Text style={styles.text1}>{calorieFromFat}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingVertical: 1,
            }}>
            <Text style={styles.text2}>% Daily Value*</Text>
          </View>
          <Row name="Total Fat" qty={fat} measure="g" procent={fatDVP} />
          <Row
            name="Saturated Fat"
            qty={satFat}
            measure="g"
            procent={satFatDVP}
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row
            name="Trans Fat"
            qty={transFat}
            noDVP={true}
            measure="g"
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row
            name="Polyunsaturated Fat"
            qty={polysatFat}
            noDVP={true}
            measure="g"
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row
            name="Monounsaturated Fat"
            qty={monosatFat}
            noDVP={true}
            measure="g"
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row
            name="Cholesterol"
            qty={cholesterol}
            measure="mg"
            procent={cholesterolDVP}
          />
          <Row name="Sodium" qty={sodium} measure="mg" procent={sodiumDVP} />
          <Row
            name="Potassium"
            qty={potassium}
            measure="mg"
            procent={potassiumDVP}
          />
          <Row
            name="Total Carbohydrates"
            qty={totalCarbs}
            measure="g"
            procent={totalCarbsDVP}
          />
          <Row
            name="Dietary Fiber"
            qty={dietFiber}
            procent={dietFiberDVP}
            measure="g"
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row
            name="Sugars"
            qty={sugar}
            procent={sugarDVP}
            measure="g"
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ marginLeft: 15 }}
          />
          <Row name="Protein" qty={protein} noDVP={true} measure="g" />
          <Row
            name="Vitamin A"
            procent={vitaminA}
            noWeight={true}
            addTextStyle={{ fontWeight: 'normal' }}
            addRowStyle={{ borderTopWidth: 8 }}
          />
          <Row
            name="Vitamin C"
            procent={vitaminC}
            noWeight={true}
            addTextStyle={{ fontWeight: 'normal' }}
          />
          <Row
            name="Calcium"
            procent={calcium}
            noWeight={true}
            addTextStyle={{ fontWeight: 'normal' }}
          />
          <Row
            name="Iron"
            procent={iron}
            noWeight={true}
            addTextStyle={{ fontWeight: 'normal' }}
          />
          <View style={styles.lowRow}>
            <Text style={styles.lowText}>
              * Percent Daily Values are based on a {dailyCal} calorie diet.
            </Text>
          </View>
        </View>
        </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 1,
  },
  innerRow: {
    flexDirection: 'row',
  },
  text1: {
    fontSize: 14,
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lowRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    borderTopWidth: 1,
    paddingVertical: 3,
  },
  lowText: {
    fontSize: 13,
    color: 'gray',
  },
});
