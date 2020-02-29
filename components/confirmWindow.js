import React from 'react';
import { connect } from 'react-redux';
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
} from 'react-native';
import { Text, Button, View } from 'native-base';
const slideAnimation = new SlideAnimation({
  slideFrom: 'top',
});

export const ConfirmWindow = props => {
  return (
    <PopupDialog
      ref={popupDialog => {
        popupDialog = popupDialog;
      }}
      dismissOnTouchOutside={false}
      width={230}
      dialogAnimation={slideAnimation}
      show={true}>
      <DialogTitle title={props.title} />
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          flex: 1,
        }}>
        <View style={{flex: 1, marginTop: 50}}>
          <Text style={{ alignSelf: 'center' }}>{props.text}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: props.confirm ? 'space-between' : 'center'
        }}>
        {props.confirm && (
          <Button
            primary
            onPress={() => {
              props.func();
              Actions.pop();
            } }
            style={styles.buttonsText}>
            <Text>{props.positiveText || 'Yes'}</Text>
          </Button>
        )}
        <Button
          primary
          onPress={() => Actions.pop()}
          style={styles.buttonsText}>
          <Text>{props.negativeText || 'Hide'}</Text>
        </Button>
        </View>
      </View>
    </PopupDialog>
  );
};

const styles = StyleSheet.create({
  buttonsText: {
    backgroundColor: '#007bff',
    width: 70,
    justifyContent: 'center'
  },

});
