export const SHOWMODAL = "SHOWMODAL";
export const HIDEMODAL = "HIDEMODAL";

export const showModal = (modalType,id) => ({
  type: SHOWMODAL,
  modalProps: id,
  modalType: modalType
})

export const hideModal = modalType => ({
  type: HIDEMODAL,
  modalType: modalType
})
