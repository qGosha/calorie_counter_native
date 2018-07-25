import React from 'react';
import { round, totalNutrElem } from '../helpers/help_functions';
import ProgressBar from 'react-native-progress/Bar';
import { Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export const ProgressPanel = ({
  value,
  now,
  currentDateLimit,
  currentDate,
  foods,
  totalDailyNutr,
  dailyCal,
}) => {
  const totalProtein = totalNutrElem(203, foods);
  const totalCarbs = totalNutrElem(205, foods);
  const totalFat = totalNutrElem(204, foods);
  if (!value) value = 0;
  if (!now) now = 0;
  if (
    currentDateLimit &&
    new Date(currentDate).getDate() !== new Date().getDate()
  )
    value = currentDateLimit;
  const progress = value && now ? now / value : 0;
  const rest = round(value - now);
  const valueStyle = { fontWeight: 'bold' };
  const descrStyle = {
    fontSize: '1.2rem',
    color: '#999',
  };
  const barStyle = {
    margin: '0 5px 10px 5px',
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.numText}>{round(now)}</Text>
          <Text style={styles.calText}>Cal intake</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.numText}>{rest}</Text>
          <Text style={styles.calText}>
            {progress <= 1 ? 'Cal remaining' : 'Cal over'}
          </Text>
        </View>
      </View>
      <ProgressBar
        progress={progress <= 1 ? progress : 1}
        width={null}
        height={12}
        color={progress <= 1 ? 'green' : 'red'}
      />
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        onPress={() =>
          foods.length && Actions.detailedPeriod({
            title: 'Daily Total',
            foods: totalDailyNutr,
            dailyCal: dailyCal,
          })
        }>
        <View style={styles.innerBlock}>
          <Text style={styles.calText}>Protein:</Text>
          <Text style={[styles.calText, { color: 'green' }]}>
            {totalProtein}
          </Text>
        </View>
        <View style={styles.innerBlock}>
          <Text style={styles.calText}>Carbs:</Text>
          <Text style={[styles.calText, { color: 'green' }]}>{totalCarbs}</Text>
        </View>
        <View style={[styles.innerBlock, { borderRightWidth: 0 }]}>
          <Text style={styles.calText}>Fat:</Text>
          <Text style={[styles.calText, { color: 'green' }]}>{totalFat}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  numText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  calText: {
    fontSize: 13,
    color: '#333',
  },
  innerBlock: {
    flex: 1,
    alignItems: 'center',
    padding: 2,
    borderColor: '#c1c5c9',
    borderRightWidth: 1,
  },
});
