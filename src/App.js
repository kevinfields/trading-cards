import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import ADD_SIGN_IN from "./reducers/ADD_SIGN_IN";
import HomePage from "./pages/HomePage";
import MakeCardPage from "./pages/MakeCardPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyCards from "./pages/MyCardsPage";
import AllUsersPage from "./pages/AllUsersPage";
import OtherCardsPage from "./pages/OtherCardsPage";
import ComputerBattlePage from "./pages/ComputerBattlePage";
import ChooseBattlePage from "./pages/ChooseBattlePage";
import ChooseUpgradePage from "./pages/ChooseUpgradePage";
import UpgradeCardPage from "./pages/UpgradeCardPage";
import ProfilePage from "./pages/ProfilePage";
import OtherProfilePage from "./pages/OtherProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import MakeTradePage from "./pages/MakeTradePage";
import TradeRequests from "./pages/TradeRequestsPage";
import DecideTradePage from "./pages/DecideTradePage";
import AlertsPage from './pages/AlertsPage';
import MessagesPage from "./pages/MessagesPage";
import SendMessagePage from "./pages/SendMessagePage";

firebase.initializeApp({
  apiKey: "AIzaSyD_Iz9mplfNMC33D6BUGXxe5Ug1uMEEvJs",
  authDomain: "trading-cards-48f7e.firebaseapp.com",
  projectId: "trading-cards-48f7e",
  storageBucket: "trading-cards-48f7e.appspot.com",
  messagingSenderId: "175363295618",
  appId: "1:175363295618:web:f90bf8772f1e099eaaa79b",
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const auth = firebase.auth();
const firestore = firebase.firestore();

const computerBeginnerStats = {
  health: 10,
  defense: 10,
  strength: 10,
  accuracy: 10,
};

const computerNoviceStats = {
  health: 25,
  defense: 25,
  strength: 25,
  accuracy: 25,
};

const computerProficientStats = {
  health: 50,
  defense: 50,
  strength: 50,
  accuracy: 50,
};

const computerExpertStats = {
  health: 75,
  defense: 75,
  strength: 75,
  accuracy: 75,
};

const computerMasterStats = {
  health: 95,
  defense: 95,
  strength: 95,
  accuracy: 95,
};

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [cardsId, setCardsId] = useState("");
  const [lookupId, setLookupId] = useState("");
  const [upgradeId, setUpgradeId] = useState("-");
  const [tradeRequest, setTradeRequest] = useState({
    requesteeId: '',
    cardId: '',
  });
  const [viewedRequest, setViewedRequest] = useState({});
  const [viewedOffer, setViewedOffer] = useState({});
  const [messagingId, setMessagingId] = useState('-');

  const lookupUserCards = (id) => {
    if (id === user.uid) {
      navigate('my-cards');
    } else if (cardsId === id) {
      navigate(`/profile/${cardsId}/cards`)
    } else {
      setCardsId(id);
    }
  };

  const lookupUser = (id) => {
    if (id === user.uid) {
      navigate('/my-profile');
    } else if (lookupId === id) {
      navigate(`/profile/${lookupId}`);
    }  else {
      setLookupId(id);  
    }
  };

  const upgradeCard = (id) => {

    if (id === upgradeId) {
      navigate(`/upgrade-card/${upgradeId}`);
    } else {
      setUpgradeId(id);
    }
  };

  const requestTrade = (cardId, requesteeId) => {

    if (tradeRequest.cardId === cardId) {
      navigate(`/trade-request/${tradeRequest.cardId}`);
    } else {
      setTradeRequest({
        requesteeId: requesteeId,
        cardId: cardId,
      });
    }
  };

  const openTradeRequest = (item) => {

    if (viewedRequest.id === item.id) {
      navigate(`/view-trade-request/${viewedRequest.id}`);
    } else {
      setViewedRequest(item);
    }
  }

  const openTradeRequestId = async (id) => {
    if (viewedRequest.id === id) {
      navigate(`/view-trade-request/${viewedRequest.id}`);
    } else {
      let requestData;
      await firestore.collection('users').doc(user.uid).collection('trade-offers').doc(id).get().then(doc => {
        requestData = {
          data: doc.data(),
          id: id,
        };
        setViewedRequest(requestData);
      });
    }
  }

  const openTradeOffer = (item) => {
    if (viewedOffer.id === item.id) {
      navigate(`/view-trade-offer/${viewedOffer.id}`);
    } else {
      setViewedOffer(item);
    }
  }

  const openMessenger = (id) => {
    if (messagingId === id) {
      navigate(`/send-message/${messagingId}`);
    } else {
      setMessagingId(id);
    }
  }

  useEffect(() => {
    if (cardsId !== "") {
      navigate(`/profile/${cardsId}/cards`);
    }
  }, [cardsId]);

  useEffect(() => {
    if (upgradeId !== "-") {
      navigate(`/upgrade-card/${upgradeId}`);
    }
  }, [upgradeId]);

  useEffect(() => {
    if (lookupId !== "") {
      navigate(`/profile/${lookupId}`);
    }
  }, [lookupId]);

  useEffect(() => {
    if (tradeRequest.cardId !== '') {
      navigate(`/trade-request/${tradeRequest.cardId}`);
    }
  }, [tradeRequest]);

  useEffect(() => {
    if (viewedRequest.id) {
      navigate(`/view-trade-request/${viewedRequest.id}`);
    }
  }, [viewedRequest]);

  useEffect(() => {
    if (viewedOffer.id) {
      navigate(`/view-trade-offer/${viewedOffer.id}`);
    }
  }, [viewedOffer]);

  useEffect(() => {
    if (messagingId !== '-') {
      navigate(`/send-message/${messagingId}`)
    }
  }, [messagingId]);

  useEffect(() => {
    if (user) {
      const loginTime = new Date();
      ADD_SIGN_IN(firestore.collection('users').doc(user.uid), loginTime);
    }
  }, [user])

  return (
    <div className="App">
      <Routes>
        {!user ? (
          <>
            <Route
              exact
              path="/"
              element={
                <LoginPage
                  nav={navigate}
                  auth={auth}
                  usersRef={firestore.collection("users")}
                />
              }
            />
          </>
        ) : (
          <>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/make-card"
              element={
                <MakeCardPage
                  nav={navigate}
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/all-users"
              element={
                <AllUsersPage
                  firestore={firestore}
                  user={user}
                  lookupUserCards={(id) => lookupUserCards(id)}
                  lookupUser={(id) => lookupUser(id)}
                  sendMessage={(id) => openMessenger(id)}
                />
              }
            />
            <Route
              path="/logout"
              element={<LogoutPage auth={auth} nav={navigate} />}
            />
            <Route
              path="/my-cards"
              element={<MyCards user={user} firestore={firestore} />}
            />
            <Route
              path={`/profile/${cardsId}/cards`}
              element={
                <OtherCardsPage 
                  firestore={firestore} 
                  profileId={cardsId}
                  requestCardTrade={(id) => requestTrade(id, cardsId)} 
                />
              }
            />
            <Route path="/computer-battle" element={<ChooseBattlePage />} />
            <Route
              path="/computer-battle-novice"
              element={
                <ComputerBattlePage
                  defenderCard={computerNoviceStats}
                  computerCardId="computerNovice"
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/computer-battle-beginner"
              element={
                <ComputerBattlePage
                  defenderCard={computerBeginnerStats}
                  computerCardId="computerBeginner"
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/computer-battle-proficient"
              element={
                <ComputerBattlePage
                  defenderCard={computerProficientStats}
                  computerCardId="computerProficient"
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/computer-battle-expert"
              element={
                <ComputerBattlePage
                  defenderCard={computerExpertStats}
                  computerCardId="computerExpert"
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/computer-battle-master"
              element={
                <ComputerBattlePage
                  defenderCard={computerMasterStats}
                  computerCardId="computerMaster"
                  user={user}
                  firestore={firestore}
                />
              }
            />
            <Route
              path="/upgrade-card"
              element={
                <ChooseUpgradePage
                  userRef={firestore.collection("users").doc(user.uid)}
                  cardsRef={firestore.collection("cards")}
                  onSelect={(id) => upgradeCard(id)}
                />
              }
            />
            <Route
              exact
              path={`/upgrade-card/${upgradeId}/`}
              element={
                <UpgradeCardPage
                  id={upgradeId}
                  userRef={firestore.collection("users").doc(user.uid)}
                  cardsRef={firestore.collection("cards")}
                  badgesRef={firestore.collection('badges')}
                />
              }
            />
            <Route
              path="/my-profile"
              element={
                <ProfilePage
                  userRef={firestore.collection("users").doc(user.uid)}
                  cardsRef={firestore.collection('cards')}
                />
              }
            />
            {lookupId !== "" ? (
              <Route
                exact
                path={`/profile/${lookupId}`}
                element={
                  <OtherProfilePage
                    userRef={firestore.collection("users").doc(lookupId)}
                    cardsRef={firestore.collection('cards')}
                  />
                }
              />
            ) : null}
            { tradeRequest.cardId !== '' ?
            <Route
              path={`/trade-request/${tradeRequest.cardId}`}
              element={
                <MakeTradePage 
                  userRef={firestore.collection('users').doc(user.uid)}
                  userId={user.uid}
                  requesteeId={tradeRequest.requesteeId}
                  requesteeRef={firestore.collection('users').doc(tradeRequest.requesteeId)}
                  requestedCard={tradeRequest.cardId}
                  cardsRef={firestore.collection('cards')}
                />
              }
            />
            : null}
            <Route
              path="/edit-profile"
              element={
                <EditProfilePage
                  userRef={firestore.collection("users").doc(user.uid)}
                />
              }
            />
            <Route
              path='/trade-requests-list'
              element={
                <TradeRequests
                  userId={user.uid}
                  userRef={firestore.collection('users').doc(user.uid)}
                  openRequest={(item) => openTradeRequest(item)}
                  openOffer={(item) => openTradeOffer(item)}
                />
              }
            />
            { viewedRequest.data ?
            <Route
              path={`/view-trade-request/${viewedRequest.id}`}
              element={
                <DecideTradePage
                  cardsRef={firestore.collection('cards')}
                  tradeRef={firestore.collection('users').doc(user.uid).collection('trade-offers').doc(viewedRequest.id)}
                  userRef={firestore.collection('users').doc(user.uid)}
                  traderRef={firestore.collection('users').doc(viewedRequest.data.tradingWith)}
                  allowAccept={true}
                />
              }
            />
            : null}
            { viewedOffer.data ?
            <Route
              path={`/view-trade-offer/${viewedOffer.id}`}
              element={
                <DecideTradePage
                  cardsRef={firestore.collection('cards')}
                  tradeRef={firestore.collection('users').doc(user.uid).collection('trade-offers').doc(viewedOffer.id)}
                  userRef={firestore.collection('users').doc(user.uid)}
                  traderRef={firestore.collection('users').doc(viewedOffer.data.tradingWith)}
                  allowAccept={false}
                />
              }
            />
            : null}
            <Route
              path={'/alerts'}
              element={
                <AlertsPage 
                  userRef={firestore.collection('users').doc(user.uid)}
                  openRequest={(id) => openTradeRequestId(id)}
                />
              }
            />
            <Route
              path={'/messages'}
              element={
                <MessagesPage
                  messagesRef={firestore.collection('users').doc(user.uid).collection('messages')}
                  onReply={(id) => openMessenger(id)}
                />
              }
            />
            {messagingId !== '-' ? 
            <Route 
              path={`/send-message/${messagingId}`}
              element={
                <SendMessagePage 
                  toId={messagingId} 
                  receiverRef={firestore.collection('users').doc(messagingId)}
                  myRef={firestore.collection('users').doc(user.uid)}
                  self={messagingId === user.uid}
                  myId={user.uid}
                />
              }
            />
            : null}
          </>
        )}
      </Routes>
      <div className="nav-links">
        {user ? (
          <>
            <Link className='link' to="/">Home</Link>
            <Link className='link' to="/my-profile">My Profile</Link>
            <Link className='link' to='/alerts'>My Alerts</Link>
            <Link className='link' to='/messages'>My Messages</Link>
            <Link className='link' to="/my-cards">My Cards</Link>
            <Link className='link' to='/trade-requests-list'>Trade Requests</Link>
            <Link className='link' to="/make-card">Make Card</Link>
            <Link className='link' to="/upgrade-card">Upgrade a Card</Link>
            <Link className='link' to="/computer-battle">Battle Computer</Link>
            <Link className='link' to="/all-users">All Users</Link>
            <Link className='link' to="/logout">Log Out</Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
