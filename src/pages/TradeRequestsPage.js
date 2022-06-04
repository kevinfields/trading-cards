import React, {useState, useEffect} from 'react'
import TradeRequest from '../components/TradeRequest';
import '../styling/TradeRequestsPage.css';

const TradeRequests = (props) => {

  const [requests, setRequests] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showRequests, setShowRequests] = useState('requests');

  const loadRequests = async () => {
    const requestList = [];
    const offerList = [];
    await props.userRef.collection('trade-offers').get().then(snap => {
      snap.forEach(item => {
        if (!item.data().offeror && !item.data().accepted && !item.data().declined) {
          requestList.push({
            id: item.id,
            data: item.data(),
          })
          console.log('got a request');
        } else if (item.data().offeror && !item.data().accepted && !item.data().declined) {
          offerList.push({
            id: item.id,
            data: item.data(),
          })
          console.log('got an offer');
        }
      })
    });
    setRequests(requestList);
    setOffers(offerList);
  }

  useEffect(() => {
    loadRequests();
  }, []);


  return (
    <div className='page'>
      <h3 className='request-list-header'>Trade Requests</h3>
      {showRequests === 'requests' ?
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
          : <div className='no-trades-message'>
              You do not have any current trade requests.
            </div>
        }
      </div>
      : <div className='all-offers-list'>
           {offers.length > 0 ?
            offers.map(item => (
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
                openOffer={() => props.openOffer(item)}
              />
            ))
          : <div className='no-trades-message'>
              You do not have any current trade offers.
            </div>
          }
        </div>
        }
        <div>
          <select className='requests-or-offers-switch' value={showRequests} onChange={(e) => setShowRequests(e.target.value)}>
            <option value={'requests'}>Requests for Me</option>
            <option value={'offers'}>My Offers</option>
          </select>
        </div>
    </div>
  )
}

export default TradeRequests