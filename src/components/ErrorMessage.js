import React from 'react';
import '../styling/ErrorMessage.css';

const ErrorMessage = (props) => {

  return (
    <div className='error-message'>
      <h3 className='error-header'>Sorry!</h3>
      <div className='error-text'>
        {props.text}
      </div>
    </div>
  )
}

export default ErrorMessage