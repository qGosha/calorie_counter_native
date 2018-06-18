import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TextInput, Modal, TouchableHighlight } from 'react-native';
// import { CONFIRM } from '../containers/Modal';
// import {
//   hideModal
// } from "../actions/index";


const ConfirmWindow = props => {
  // const hideModal = props.hideModal;
  // const modalText = props.text;
  // const confirmFunc = () => {
  //   props.confirmFunk();
  //   hideModal(CONFIRM);
  // };

 return (
    <View style={{marginTop: 22}}>
   <Modal
     animationType="slide"
     transparent={false}
     visible={true}
     style={{marginTop: 70}}
     onRequestClose={() => {
       alert('Modal has been closed.');
     }}>
     <View style={{marginTop: 22}}>
       <View>
         <Text>Hello World!</Text>

         <TouchableHighlight
           onPress={() => {
             alert('svasvasvasv.');
           }}>
           <Text>Hide Modal</Text>
         </TouchableHighlight>
       </View>
     </View>
   </Modal>
   </View>
 )
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType))
  };
};

export default connect(null, mapDispatchToProps)(ConfirmWindow);
