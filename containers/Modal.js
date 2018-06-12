import React from "react";
import { connect } from "react-redux";
import Basket from "./Basket";
import DetailedNutr from "./DetailedNutr";
import ConfirmWindow from './ConfirmWindow';
import IntakeLog from './IntakeLog';


export const BASKET = 'BASKET';
export const DETAILED_NUTR = 'DETAILED_NUTR';
export const CONFIRM = 'CONFIRM';
export const INTAKELOG = 'INTAKELOG';

const MODAL_COMPONENTS = {
  BASKET: Basket,
  DETAILED_NUTR: DetailedNutr,
  CONFIRM: ConfirmWindow,
  INTAKELOG: IntakeLog

};

const ModalRoot = ({...modal}) => {
  const modalType = modal.modal.modalType;
  const modalProps = modal.modal.modalProps;
  if (!modalType || !modalType.length) {
    return null;
  }
  const modals = modalType.map( (window, i) => {
  const SpecificModal = MODAL_COMPONENTS[window];
  return <SpecificModal {...modalProps} key={window}/>;
  })
  return <div> {modals} </div>;

};

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps, null)(ModalRoot)
