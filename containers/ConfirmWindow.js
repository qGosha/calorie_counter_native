import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, Modal, TouchableHighlight } from 'react-native';
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import { CustomButton } from '../components/customButton';
import { Text, Button, View } from 'native-base';
import { hideModal } from '../actions/index';
const slideAnimation = new SlideAnimation({
  slideFrom: 'top',
});

const ConfirmWindow = props => {
  // const hideModal = props.hideModal;
  // const modalText = props.text;
  // const confirmFunc = () => {
  //   props.confirmFunk();
  //   hideModal(CONFIRM);
  // };

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
        <View style={{flexDirection: 'row', flex: 1, justifyContent: props.confirm ? 'space-between' : 'center'}}>
        {props.confirm && (
          <Button
            primary
            onPress={() => {
              props.func();
              Actions.pop();
            } }
            style={{ backgroundColor: '#007bff', width: 70,  }}>
            <Text>{props.positiveText || 'Yes'}</Text>
          </Button>
        )}
        <Button
          primary
          onPress={() => Actions.pop()}
          style={{ backgroundColor: '#007bff', width: 70,}}>
          <Text>{props.negativeText || 'Hide'}</Text>
        </Button>
        </View>
      </View>
    </PopupDialog>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ConfirmWindow);
