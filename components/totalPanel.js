import React from "react";
import { totalNutrElem } from '../helpers/help_functions';
import { StyleSheet } from 'react-native';
import {
  View,
  Text
} from 'native-base';
export const TotalPanel = ({ foods }) => {


    const totalCalories = totalNutrElem(208, foods);
    const totalProtein = totalNutrElem(203, foods);
    const totalCarbs = totalNutrElem(205, foods);
    const totalFat = totalNutrElem(204, foods);
    const totalSodium = totalNutrElem(307, foods);
    return (
      <View style={{ flex: 1 }}>
       <View style={ [styles.block, {backgroundColor: '#c1c5c9'}] }>
        <Text>Totat calories:</Text>
        <Text style={{ color: 'green' }}>{totalCalories}</Text>
       </View>
       <View style={ [styles.block, {backgroundColor: '#9c909e36'}] }>
        <View style={styles.innerBlock}>
          <Text>Protein:</Text>
          <Text style={{ color: 'green' }}>{totalProtein}</Text>
        </View>
        <View style={styles.innerBlock}>
          <Text>Carbs:</Text>
          <Text style={{ color: 'green' }}>{totalCarbs}</Text>
        </View>
        <View style={styles.innerBlock}>
          <Text>Fat:</Text>
          <Text style={{ color: 'green' }}>{totalFat}</Text>
        </View>
        <View style={[styles.innerBlock, {borderRightWidth: 0}]}>
          <Text>Sodium:</Text>
          <Text style={{ color: 'green' }}>{totalSodium}</Text>
        </View>
       </View>
     </View>
    )
    }

    const styles = StyleSheet.create({
      block: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingTop: 8,
        paddingHorizontal: 5
      },
      innerBlock: {
        alignItems: 'center',
        padding: 8,
        borderColor: '#c1c5c9' ,
        borderRightWidth: 1
      }

    });
