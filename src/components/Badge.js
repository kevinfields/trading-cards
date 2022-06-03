import React from 'react'

const Badge = (props) => {
  return (
    <div className='badge' style={props.styling}>
      <div className='badge-title'>{props.badge.title}</div>
      <div className='badge-description'>{props.badge.description}</div>
      <div className='badge-count'>x{props.badge.amount}</div>
    </div>
  )
}

export default Badge