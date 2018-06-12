import React from "react";
import FontAwesome from 'react-fontawesome';
import {
  Button
} from 'react-bootstrap';
export const PasswordEye = ({showPassword, onClick}) => {
  return (
    <Button onClick={() => onClick()}> {
     !showPassword ? <FontAwesome
      className='fas fa-eye'
      name='eye'
    />
    :
     <FontAwesome
      className='fas fa-eye-slash'
      name='eye-slash'
    />

  }
  </Button>
)


}
