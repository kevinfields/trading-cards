import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";
import "../styling/MyCardsPage.css";

const MyCards = (props) => {
  const userRef = props.firestore.collection("users").doc(props.user.uid);
  const cardsRef = props.firestore.collection("cards");
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    let cardList = [];
    await userRef.get().then((doc) => {
      cardList = doc.data().cards;
    });

    let allCards = [];
    for (let i = 0; i < cardList.length; i++) {
      await cardsRef
        .doc(cardList[i])
        .get()
        .then((doc) => {
          allCards.push(doc.data());
        });
    }
    setCards(allCards);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="page">
      <div className="card-list">
        {cards.length > 0 ? (
          cards.map((card) => <Card card={card} />)
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default MyCards;
