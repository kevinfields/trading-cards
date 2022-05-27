import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/MakeTradePage.css';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import getCardLevel from '../functions/getCardLevel';
import getTotalStats from '../functions/getTotalStats';
import MAKE_TRADE_REQUEST from '../reducers/MAKE_TRADE_REQUEST';


const MakeTradePage = (props) => {

  const [requestedCard, setRequestedCard] = useState({});
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();

  const loadCardRequest = async () => {
    let cardData;
    await props.cardsRef.doc(props.requestedCard).get().then((doc) => {
      cardData = doc.data();
    });
    setRequestedCard(cardData);
  };

  const loadMyCards = async () => {

    let cardIds = [];
    let cardsData = [];
    await props.userRef.get().then(doc => {
      cardIds = doc.data().cards;
    })
    for (let i=0; i<cardIds.length; i++) {
      await props.cardsRef.doc(cardIds[i]).get().then(doc => {
        cardsData.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    }
    setMyCards(cardsData);
  }

  const setupOffer = async (cardId, cardName) => {
    if (window.confirm(`Are you sure you want to offer ${cardName} for ${requestedCard.name}? This offer cannot be revoked.`)) {
      const time = new Date();
      await MAKE_TRADE_REQUEST(props.userRef, props.requesteeRef, cardId, props.requestedCard, time).then(() => {
        navigate('/my-profile');
      })
    }
  }

  useEffect(() => {
    loadCardRequest();
    loadMyCards();
  }, [])

  return (
    <div className='page'>
      <h3>Trade Request for {requestedCard.name}</h3>
        <Card card={requestedCard} />
      <div className='trade-helper'>
        This card has total stats of {getTotalStats(requestedCard)}, making it a {getCardLevel(getTotalStats(requestedCard))} card. 
      </div>
      <div className='trade-request-my-cards-header'>Select one of your cards to offer.</div>
      <div className='trade-request-my-cards'>
        {myCards.length > 0 ? 
          myCards.map((item) => (
            <Card card={item.data} key={item.id} onOffer={() => setupOffer(item.id, item.data.name)}/>
          ))
          : <LoadingScreen />
        }
      </div>
    </div>
  )
}

export default MakeTradePage;