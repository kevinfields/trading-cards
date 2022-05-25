import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const ChooseUpgradePage = (props) => {
  const [cardList, setCardList] = useState([]);

  const loadCards = async () => {
    let cards = [];
    let objects = [];
    await props.userRef.get().then((doc) => {
      cards = doc.data().cards;
    });
    for (let i = 0; i < cards.length; i++) {
      await props.cardsRef
        .doc(cards[i])
        .get()
        .then((doc) => {
          objects.push({
            id: cards[i],
            data: doc.data(),
          });
        });
    }
    setCardList(objects);
  };

  const selectUpgrade = (id) => {
    props.onSelect(id);
  };

  useEffect(() => {
    loadCards();
  });

  return (
    <div className="page">
      <h3>Choose a card to upgrade</h3>
      {cardList.length > 0 ? (
        cardList.map((item) => (
          <div
            className="upgrade-card-choice"
            onClick={() => selectUpgrade(item.id)}
            key={item.id}
          >
            Upgrade {item.data.name}
          </div>
        ))
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default ChooseUpgradePage;
