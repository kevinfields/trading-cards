import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/DecideTradePage.css';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import ACCEPT_TRADE from '../reducers/ACCEPT_TRADE';
import DECLINE_TRADE from '../reducers/DECLINE_TRADE';

const DecideTradePage = (props) => {

  const [details, setDetails] = useState({});
  const [offeredCard, setOfferedCard] = useState({});
  const [requestedCard, setRequestedCard] = useState({});
  const [twinRef, setTwinRef] = useState('');
  const navigate = useNavigate();

  const loadTradeDetails = async () => {

    let tradeRequestData;
    await props.tradeRef.get().then(doc => {
      tradeRequestData = {
        id: doc.id,
        data: doc.data(),
      };
    });
    setDetails(tradeRequestData);
    setTwinRef(tradeRequestData.data.twinDoc);
  }

  const loadCardDetails = async () => {

    let offerData;
    let requestData;
    await props.cardsRef.doc(details.data.offeredCard).get().then(doc => {
      offerData = {
        id: doc.id,
        data: doc.data(),
      }
    });
    setOfferedCard(offerData);
    await props.cardsRef.doc(details.data.requestedCard).get().then(doc => {
      requestData = {
        id: doc.id,
        data: doc.data(),
      }
    });
    setRequestedCard(requestData);
  }

  const respond = async (accept) => {

    if (accept) {
      if (window.confirm('Are you sure? This trade will be final, and can only be reversed by trading the cards again.')) {

        const timeStamp = new Date();

        await ACCEPT_TRADE(
          props.tradeRef, 
          props.traderRef.collection('trade-offers').doc(twinRef), 
          props.userRef, 
          props.traderRef, 
          props.cardsRef.doc(details.data.requestedCard), 
          props.cardsRef.doc(details.data.offeredCard),
          timeStamp,
        ).then(() => {
          navigate('/my-cards');
        })
      } else {
        return;
      }
    } else {
      if (window.confirm('Are you sure? You may request this trade again in the future.')) {
        const timeStamp = new Date();
        await DECLINE_TRADE(
          props.tradeRef, 
          props.traderRef.collection('trade-offers').doc(twinRef),
          props.traderRef.collection('alerts'),
          timeStamp,
        ).then(() => {
          navigate('/trade-requests-list');
        })
      } else {
        return;
      }
    }
  }


  useEffect(() => {
    loadTradeDetails();
  }, []);

  useEffect(() => {
    if (details.data) {
      loadCardDetails();
    }
  }, [details])

  return (
    <div className='page'>
      { details.id ?
      <div className='trade-request-wrapper'>
        <h3 className='trade-request-header'>Trade Request {props.allowAccept ? `from ${details.data.tradingWithName}` : `for ${details.data.tradingWithName}`}</h3>
        <div className='offer-screen'>
          <p>You have {props.allowAccept ? 'been' : null} offered: </p>
          { offeredCard.id ?
          <Card card={offeredCard.data} />
          : null}
        </div>
        <div className='request-screen'>
          <p>In return, {props.allowAccept ? `${details.data.tradingWithName} will ` : 'you would '}receive: </p>
          {requestedCard.id ?
          <Card card={requestedCard.data} />
          : null }
        </div>
        { props.allowAccept ?
        <div className='trade-decision-buttons'>
          <button className='accept-trade-button' onClick={() => respond(true)}>Accept Trade</button>
          <button className='decline-trade-button' onClick={() => respond(false)}>Decline Trade</button>
        </div>
        : null }
      </div>
      : <LoadingScreen />
      }
    </div>
  )
}

export default DecideTradePage