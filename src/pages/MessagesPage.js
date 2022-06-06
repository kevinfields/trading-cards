
import React, {useState, useEffect} from 'react'
import LoadingScreen from '../components/LoadingScreen';
import '../styling/MessagesPage.css';
import Message from '../components/Message';

const MessagesPage = (props) => {

  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUnread, setShowUnread] = useState('unread');

  const loadMessages = async () => {

    let messageArr = [];
    await props.messagesRef.get().then(snap => {
      snap.forEach(doc => {
        messageArr.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    })
    setAllMessages(messageArr.sort((a, b) => a.data.timestamp - b.data.timestamp));
    setMessages(messageArr.filter(mess => !mess.data.read))
    setLoading(false);
  }


  const readMessage = async (item) => {

    let newMessageArr = messages.filter(mess => mess.id !== item.id);

    if (showUnread === 'unread') {
      setMessages(newMessageArr);
    }

    await props.messagesRef.doc(item.id).set({
      ...item.data,
      read: true,
    });

    let allMessagesCatcher = [...allMessages];
    for (const mess of allMessagesCatcher) {
      if (mess.id === item.id) {
        mess.data = {
          ...mess.data,
          read: true,
        }
      }
    }
    setAllMessages(allMessagesCatcher);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {

    if (showUnread === 'unread') {
      setMessages(allMessages.filter(mess => !mess.data.read));
    } else {
      setMessages(allMessages);
    }
    
  }, [showUnread])


  return (
    <div className='page'>
      {loading ? <LoadingScreen /> :
        <>
          <div className='message-list'>
            {messages.length > 0 ? 
              messages.map(item => (
                <Message 
                  data={item.data}
                  key={messages.indexOf(item)}
                  onRead={() => readMessage(item)}
                  onReply={() => props.onReply(item.data.fromId)}
                />
              ))
              : <div className='no-messages-notif'>You have no unread messages.</div>
            }
          </div>
          <select className='unread-switch' onChange={(e) => setShowUnread(e.target.value)}>
            <option value={'unread'}>Show Unread Only</option>
            <option value={'all'}>Show All</option>
          </select>
        </>
      }
    </div>
  )
}

export default MessagesPage