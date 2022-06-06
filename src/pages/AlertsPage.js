
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import LoadingScreen from '../components/LoadingScreen';
import formatTime from '../functions/formatTime';
import '../styling/AlertsPage.css';


const AlertsPage = (props) => {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadAlerts = async () => {

    let alertArray = [];
    await props.userRef.collection('alerts').get().then(snap => {
      snap.forEach(item => {
        if (!item.data().read) {
          alertArray.push({
            data: item.data(),
            id: item.id,
          });
        }
      })
    });
    setAlerts(alertArray);
    setLoading(false);
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  const hideAlert = async (id) => {

    let alertData;

    await props.userRef.collection('alerts').doc(id).get().then(doc => {
      alertData = doc.data();
    })
    props.userRef.collection('alerts').doc(id).set({
      ...alertData,
      read: true,
    });
    setAlerts(alerts.filter(item => item.id !== id));
  }

  return (
    <div className='page'>
      {!loading ?
        <>
          {alerts.length > 0 ?
            alerts.map(item => (
              <Alert 
                message={item.data.message}
                time={formatTime(item.data.timestamp.seconds * 1000)}
                hideAlert={() => hideAlert(item.id)}
                type={item.data.type}
                openRequest={props.openRequest ? () => props.openRequest(item.data.requestId) : null}
                openMessage={() => navigate('/messages')}
                tradeOfferRef={item.data.requestId ? props.userRef.collection('trade-offers').doc(item.data.requestId) : null}
              />
            ))
          : <div className='no-alerts'>
              You have no new alerts.
            </div>
        }
        </>
      : <LoadingScreen />}
    </div>
  )
}

export default AlertsPage