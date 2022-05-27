import React from 'react';
import '../styling/TradeRequest.css';

const TradeRequest = (props) => {

  return (
    <div className='trade-request'>
      <p className='trade-request-detail'>{props.offeror} {'=>'} {props.requestee}</p>
      <p className='trade-request-detail'>{props.offeredCardName} {'<=>'} {props.requestedCardName}</p>
      <p className='trade-request-detail'>Stat Total: {props.offeredCardStats} {'<=>'} Stat Total: {props.requestedCardStats}</p>
      <button className='view-trade' onClick={() => props.openRequest()}>Click here to view details</button>
    </div>
  )
}

export default TradeRequest