import React from "react";
import { DetailedNutrPanel } from '../components/detailedNutrPanel'
import { connect } from "react-redux";
import {
  Modal,
  Button
} from 'react-bootstrap';
import { DETAILED_NUTR } from '../containers/Modal';
import {
  hideModal
} from "../actions/index";
import '../style/nutr_details.css';

const DetailedNutr = props => {
  if(!props.basket.length) return null;
  const hideDetailedModal = props.hideDetailedModal;
  const basketItem = props.basket[props.id];
  return (
    <Modal
      show={true}
      keyboard={true}
      onHide={() => hideDetailedModal(DETAILED_NUTR)}
      aria-labelledby="nutr-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="nutr-modal-title-lg">
            Nutrition details
           </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <DetailedNutrPanel
       foodObj={basketItem}
       isFromBasket={true}
       dailyCal={props.dailyCal}/>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger"
          onClick={() => hideDetailedModal(DETAILED_NUTR)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    hideDetailedModal: modalType => dispatch(hideModal(modalType))
  };
};
const mapStateToProps = state => ({
  basket: state.basket,
  dailyCal: state.dash.userInfo['daily_kcal']
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailedNutr);
