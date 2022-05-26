import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";
import getTotalStats from "../functions/getTotalStats";
import "../styling/ChooseUpgradePage.css";

const ChooseUpgradePage = (props) => {
  const [cardList, setCardList] = useState([]);
  const [balance, setBalance] = useState(-1);

  const loadCards = async () => {
    let cards = [];
    let xpRemaining = 0;
    let objects = [];
    await props.userRef.get().then((doc) => {
      cards = doc.data().cards;
      xpRemaining = doc.data().xpRemaining;
    });
    for (let i = 0; i < cards.length; i++) {
      await props.cardsRef
        .doc(cards[i])
        .get()
        // eslint-disable-next-line no-loop-func
        .then((doc) => {
          objects.push({
            id: cards[i],
            data: doc.data(),
          });
        });
    }
    setCardList(objects);
    setBalance(xpRemaining);
  };

  const selectUpgrade = (id) => {
    props.onSelect(id);
  };

  useEffect(() => {
    loadCards();
  });

  return (
    <div className="page">
      <h3>
        Choose a card to upgrade. You have {balance !== -1 ? balance : "_"} xp
        to add.
      </h3>
      {cardList.length > 0 ? (
        <div className="upgrade-card-choice">
          {cardList.map((item) =>
            getTotalStats(item.data) < 400 ? (
              <div
                onClick={() => selectUpgrade(item.id)}
                key={item.id}
                className="upgrade-option"
              >
                <Card card={item.data} blockValueForm={true} />
              </div>
            ) : (
              <div key={item.id} className="non-upgrade-option">
                <Card card={item.data} blockValueForm={true} />
              </div>
            )
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default ChooseUpgradePage;
