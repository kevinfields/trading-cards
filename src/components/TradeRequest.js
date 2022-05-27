import React from 'react'

const TradeRequest = (props) => {

  return (
    <div className='trade-request'>
      <p className='trade-request-detail'>{props.offeror} ={'>'} {props.requestee}</p>
      <p className='trade-request-detail'>{props.offeredCard} {'<=>'} {props.requestedCard}</p>
      <div className='view-trade'>Click here to view details</div>
    </div>
  )
}

export default TradeRequest