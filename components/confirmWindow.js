import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import Modal, { SlideAnimation, ModalContent, ModalTitle } from 'react-native-modals';
import Modal from "react-native-modal";

import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
} from 'react-native';
import { Text, Button, View } from 'native-base';

export const ConfirmWindow = props => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    return () => setVisible(false)
  }, [])
  return (
    // <Modal
    //   visible={true}
    //   modalAnimation={new SlideAnimation({
    //     slideFrom: 'top',
    //   })}
    //   modalTitle={<ModalTitle title={props.title} />}
    // >
      //  <ModalContent>
      <Modal isVisible={visible} supportedOrientations={['portrait', 'landscape']}>
      <View
        style={{
          alignSelf: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'center',
          backgroundColor: '#fff',
          width: 300,
          height: 200
        }}>
        <View style={{ flex: 1, marginTop: 50 }}>
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
              }}
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
      {/* </ModalContent> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonsText: {
    backgroundColor: '#007bff',
    width: 70,
    justifyContent: 'center'
  },

});
