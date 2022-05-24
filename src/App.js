import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "./pages/HomePage";
import MakeCardPage from "./pages/MakeCardPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import MyCards from "./pages/MyCardsPage";
import AllUsersPage from "./pages/AllUsersPage";
import OtherCardsPage from "./pages/OtherCardsPage";
import ComputerBattlePage from "./pages/ComputerBattlePage";

firebase.initializeApp({
  apiKey: "AIzaSyD_Iz9mplfNMC33D6BUGXxe5Ug1uMEEvJs",
  authDomain: "trading-cards-48f7e.firebaseapp.com",
  projectId: "trading-cards-48f7e",
  storageBucket: "trading-cards-48f7e.appspot.com",
  messagingSenderId: "175363295618",
  appId: "1:175363295618:web:f90bf8772f1e099eaaa79b",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const computerTestStats = {
  health: 25,
  defense: 25,
  strength: 25,
  accuracy: 25,
};

const playerTestStats = {
  health: 50,
  defense: 25,
  strength: 50,
  accuracy: 75,
};

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [profileId, setProfileId] = useState("");

  const lookupUser = (id) => {
    setProfileId(id);
  };

  useEffect(() => {
    if (profileId !== "") {
      navigate(`/profile/${profileId}/cards`);
    }
  }, [profileId]);

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
                  changeUser={(id) => lookupUser(id)}
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
              path={`/profile/${profileId}/cards`}
              element={
                <OtherCardsPage firestore={firestore} profileId={profileId} />
              }
            />
            <Route
              path="/computer-battle"
              element={
                <ComputerBattlePage
                  attackerCard={playerTestStats}
                  defenderCard={computerTestStats}
                />
              }
            />
          </>
        )}
      </Routes>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/make-card">Make Card</Link>
            <Link to="/my-cards">My Cards</Link>
            <Link to="/all-users">All Users</Link>
            <Link to="/computer-battle">Battle Computer</Link>
            <Link to="/logout">Log Out</Link>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
