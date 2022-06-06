import React from 'react'
import formatTime from '../functions/formatTime';
import '../styling/Message.css';

const Message = (props) => {
  return (
    <div className='message'>
      <p className='message-sender'>
        FROM: {props.data.fromName}
      </p>
      <div className='message-text'>{props.data.message}</div>
      <p className='message-time'> - {formatTime(props.data.timestamp.seconds * 1000)}</p>
      { !props.data.read ?
        <button className='message-read-button' onClick={() => props.onRead()}>Mark as Read</button>
      : null }
      <button className='reply-button' onClick={() => props.onReply()}>Reply</button>
    </div>
  )
}

export default Message