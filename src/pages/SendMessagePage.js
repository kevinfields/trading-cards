import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import '../styling/SendMessagePage.css';
import LoadingScreen from '../components/LoadingScreen';
import ADD_ALERT from '../reducers/ADD_ALERT';
import SEND_MESSAGE from '../reducers/SEND_MESSAGE';

const SendMessagePage = (props) => {

  const [text, setText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadReceiverData = async () => {

    let data;
    await props.receiverRef.get().then(doc => {
      data = doc.data();
    })

    if (!props.self) {
      setReceiverName(data.name);
    } else {
      setReceiverName('myself');
    }
    setLoading(false);
  }

  const loadMyData = async () => {

    //I think this is necessary in case the user changes their name in the app,
    //as the displayName property in the user's firebase object will no longer be accurate.
    let name = '';
    await props.myRef.get().then(doc => {
      name = doc.data().name;
    });
    setSenderName(name);
  };

  const sendMessage = async () => {

    const time = new Date();
    const messageData = {
      fromId: props.myId,
      fromName: senderName,
      message: text,
      read: false,
      timestamp: time,
    };

    await SEND_MESSAGE(props.receiverRef, messageData).then(res => {
      console.log(res);
      navigate('/all-users');
    });

    const alertMess = `You have a new message from ${senderName}.`;

    await ADD_ALERT(props.receiverRef.collection('alerts'), alertMess, time, 'new message');

  }

  useEffect(() => {

    loadMyData();
    loadReceiverData();

  }, []);

  return (
    <div className='page'>
      {loading ? <LoadingScreen /> : 
      <div className='new-message-box'>
        <h3 className='new-message-header'>Send a message to {receiverName}</h3>
        <textarea className='new-message-input' onChange={(e) => setText(e.target.value)} rows={10}/>
        <p className='from-tag'> - {senderName}</p>
        <button className='send-message-button' onClick={() => sendMessage()}>Send Message</button>
      </div>
      }
    </div>
  )
}

export default SendMessagePage