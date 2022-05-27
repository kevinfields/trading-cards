import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";

const OtherCardsPage = (props) => {
  const userRef = props.firestore.collection("users").doc(props.profileId);
  const cardsRef = props.firestore.collection("cards");
  const [cards, setCards] = useState([]);

  const loadCards = async () => {
    let cardList;
    await userRef.get().then((doc) => {
      cardList = doc.data().cards;
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
            // I think it would make more sense to set the id directly as cardList[i] but
            // vs code doesn't like it and this has the same result.
          });
        });
    }
    setCards(allCards);
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="page">
      <div className="card-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card 
              card={card.data} 
              key={`${card.data.ownerId}${card.data.name}`} 
              requestTrade={() => props.requestCardTrade(card.id, card.data.ownerId)}
            />))
        ) : (
          <LoadingScreen />
        )}
      </div>
    </div>
  );
};

export default OtherCardsPage;
