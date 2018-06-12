import { SHOWMODAL, HIDEMODAL } from '../actions/index';

const initialState = {
  modalType: [],
  modalProps: {}
}

export function modal(state = initialState, action) {
  switch (action.type) {
    case SHOWMODAL:
      return {
        modalType: [...state.modalType, action.modalType],
        modalProps: action.modalProps
      }
    case HIDEMODAL:
      return {
        modalType: state.modalType.filter(item => item !== action.modalType),
        modalProps: action.modalProps
      }
    default:
      return state;
  }
}
