import { reauthenticateWithCredential } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";
import DESTROY_CARD from "../reducers/DESTROY_CARD";
import "../styling/MyCardsPage.css";

const MyCards = (props) => {
  const userRef = props.firestore.collection("users").doc(props.user.uid);
  const cardsRef = props.firestore.collection("cards");
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    let cardList = [];
    await userRef.get().then((doc) => {
      cardList = doc.data().cards;
      if (cardList.length === 0) {
        setLoading(false);
      }
    });

    let allCards = [];
    for (let i = 0; i < cardList.length; i++) {
      await cardsRef
        .doc(cardList[i])
        .get()
        .then((doc) => {
          allCards.push({
            data: doc.data(),
            id: doc.id,
          });
        });
    }
    setCards(allCards);
    setLoading(false);
  };

  const destroyer = async (id, name) => {

    if (!window.confirm(`Are you sure you want to destroy ${name}? This cannot be undone!`)) {
      return;
    };
    console.log('time to destroy')
    await DESTROY_CARD(cardsRef.doc(id), userRef).then(() => {
      console.log("success!")
      getCards();
    });
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="page">
      {!loading ?
      <div className="card-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card card={card.data} key={card.id} onDestroy={() => destroyer(card.id, card.data.name)}/>
          ))
        ) : (
          <div className='make-card-prompt'>
            <p className='make-card-alert'>You do not have any cards!</p>
            <Link to='/make-card'>Click here to get started making one.</Link>
          </div>
        )}
      </div>
      : <LoadingScreen />}
    </div>
  );
};

export default MyCards;
