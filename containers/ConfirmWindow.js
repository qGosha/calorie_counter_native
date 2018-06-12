import React from "react";
import {
  Modal,
  Button,
  ListGroupItem,
  Image,
  FormGroup,
  form,
  FormControl
} from 'react-bootstrap';
import { Container, Row, Col } from 'react-grid-system';
import { connect } from "react-redux";
import { CONFIRM } from '../containers/Modal';
import {
  hideModal
} from "../actions/index";


const ConfirmWindow = props => {
  const hideModal = props.hideModal;
  const modalText = props.text;
  const confirmFunc = () => {
    props.confirmFunk();
    hideModal(CONFIRM);
  };

 return (
   <div className="static-modal">
   <Modal
     show={true}
     keyboard={true}
     onHide={() => hideModal(CONFIRM)}
     aria-labelledby="confirm-modal-title">
     <Modal.Header closeButton>
       <Modal.Title id="confirm-modal-title-lg">
       Confirm
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
     <Container fluid>
     <Row>
      <Col style={{padding:'30px 15px'}}>
       {modalText}
      </Col>
     </Row>
       <Row style={{justifyContent:'center'}}>
        <Col style={{margin:'0 20px 20px 0'}}>
         <Button
           bsStyle="danger"
           style={{margin: '0 20px 0 0'}}
           onClick={confirmFunc}>
           Yes
         </Button>
          <Button
            onClick={() => hideModal(CONFIRM)}>
            No
          </Button>
         </Col>
       </Row>
     </Container>
     </Modal.Body>
   </Modal>
   </div>
 )
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: modalType => dispatch(hideModal(modalType))
  };
};

export default connect(null, mapDispatchToProps)(ConfirmWindow);
