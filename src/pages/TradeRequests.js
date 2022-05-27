import React, {useState, useEffect} from 'react'
import TradeRequest from '../components/TradeRequest';

const TradeRequests = (props) => {

  const [requests, setRequests] = useState([]);

  const loadOffers = async () => {
    const offerList = [];
    await props.userRef.collection('trade-offers').get().then(snap => {
      snap.forEach(item => {
        if (!item.data().offeror && !item.data().accepted && !item.data().declined) {
          offerList.push({
            id: item.id,
            data: item.data(),
          })
        }
      })
    });
    setRequests(offerList);
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <div className='page'>
      <h3>Trade Requests</h3>
      <div className='all-requests-list'>
        {requests.length > 0 ?
          requests.map(item => (
            <TradeRequest 
              offeror={item.data.offeror ? item.data.userName : item.data.tradingWithName}
              offeredCard={item.data.offeredCard}
              offeredCardName={item.data.offeredCardName ? item.data.offeredCardName : '-'}
              offeredCardStats={item.data.offeredCardStats ? item.data.offeredCardStats : 0}
              requestee={item.data.offeror ? item.data.tradingWithName : item.data.userName}
              requestedCard={item.data.requestedCard}
              requestedCardName={item.data.requestedCardName ? item.data.requestedCardName : '-'}
              requestedCardStats={item.data.requestedCardStats ? item.data.requestedCardStats : 0}
              requestDate={item.data.requestDate}
              openRequest={() => props.openRequest(item)}
            />
          ))
          : null
        }
      </div>
    </div>
  )
}

export default TradeRequests