import React, {useState, useEffect} from 'react';
import '../styling/Alert.css';

const Alert = (props) => {

  const [valid, setValid] = useState(false);

  const getValidity = async () => {

    let offerData;
    await props.tradeOfferRef.get().then(doc => {
      offerData = doc.data();
      if (!offerData.accepted && !offerData.declined) {
        setValid(true);
      } else {
        setValid(false);
      }
    })
  };

  useEffect(() => {

    if (props.tradeOfferRef != null) {
      getValidity();
    }
    
  }, []);

  return (
    <div className='alert'>
      <p className='alert-message'>{props.message}</p>
      <p className='alert-time'>{props.time}</p>
      <div className='flex-buttons'>
        <button className='alert-read' onClick={() => props.hideAlert()}>Mark as Read</button>
        {props.type === 'trade request' && valid ?
          <button className='view-request' onClick={() => props.openRequest()}>View Request</button>
        : null}
        {props.type === 'new message' ?
          <button className='view-request' onClick={() => props.openMessage()}>View Message</button>
        : null}
      </div>
    </div>
  )
}

export default Alert