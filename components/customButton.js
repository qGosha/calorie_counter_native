import React from "react";
import { StyleSheet,Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';



export const CustomButton = ({text, func, isDisabled, customStyle, indicate}) => {
  return (
    <TouchableOpacity
        style={[styles.buttonContainer, customStyle]}
        onPress={func}
        disabled={isDisabled}
        
      >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        { indicate ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 180,
    borderColor: '#2980b9',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginTop: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    marginLeft: 5
  }
});
