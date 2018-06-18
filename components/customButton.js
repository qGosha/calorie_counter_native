import React from "react";
import { StyleSheet,Text, View, TouchableOpacity } from 'react-native';



export const CustomButton = ({text, func, isDisabled, customStyle}) => {
  return (
    <TouchableOpacity
        style={[styles.buttonContainer, customStyle]}
        onPress={func}
        disabled={isDisabled}
      >
      <Text style={styles.buttonText}>{text}</Text>
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
    fontWeight: '700'
  }
});
