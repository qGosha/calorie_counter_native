import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Modal, TouchableHighlight } from 'react-native';
import PopupDialog, {DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import { CustomButton } from '../components/customButton'
// import { CONFIRM } from '../containers/Modal';
import {
  hideModal
} from "../actions/index";
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
   ref={(popupDialog) => { popupDialog = popupDialog; }}
   dismissOnTouchOutside={false}
   width={200}
   dialogAnimation={slideAnimation}
   show={true}
 >
 <DialogTitle title={props.title} />
   <View style={{
     paddingLeft: 10,
     paddingRight:10,
     flex: 1,
     justifyContent: 'space-around'
   }}>
     <Text style={{alignSelf: 'center'}}>{props.text}</Text>
     <CustomButton
     text={"Hide"}
     func={() => Actions.pop()}
     customStyle={{backgroundColor: '#007bff'}} />
   </View>
 </PopupDialog>
 )
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType))
  };
};

export default connect(null, mapDispatchToProps)(ConfirmWindow);