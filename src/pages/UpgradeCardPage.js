import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UPGRADE_CARD from "../reducers/UPGRADE_CARD";
import "../styling/UpgradeCardPage.css";

const UpgradeCardPage = (props) => {
  const [cardData, setCardData] = useState({});
  const [balance, setBalance] = useState(0);
  const [originalBalance, setOriginalBalance] = useState(0);
  const [cost, setCost] = useState(0);
  const [minStats, setMinStats] = useState({
    health: 0,
    accuracy: 0,
    strength: 0,
    defense: 0,
  });
  const [newStats, setNewStats] = useState({
    health: 0,
    accuracy: 0,
    strength: 0,
    defense: 0,
  });
  const navigate = useNavigate();

  const loadCardDataAndBalance = async () => {
    let cardInfo;
    let xpBalance;
    await props.cardsRef
      .doc(props.id)
      .get()
      .then((doc) => {
        cardInfo = doc.data();
      });
    await props.userRef.get().then((doc) => {
      xpBalance = doc.data().xpRemaining;
    });
    setBalance(xpBalance);
    setOriginalBalance(xpBalance);
    setCardData(cardInfo);
    setMinStats({
      health: cardInfo.health,
      accuracy: cardInfo.accuracy,
      strength: cardInfo.strength,
      defense: cardInfo.defense,
    });
    setNewStats({
      health: cardInfo.health,
      accuracy: cardInfo.accuracy,
      strength: cardInfo.strength,
      defense: cardInfo.defense,
    });
  };

  const upgradeStat = (stat, change) => {

    if (balance <= 0 && change > 0) {
      return;
    }

    switch (stat) {
      case "health":
        if (newStats.health >= 100 && Number(change) > 0) {
          return;
        } else if (Number(newStats.health) + Number(change) < minStats.health) {
          return;
        } else {
          setNewStats({
            ...newStats,
            health: Number(newStats.health) + Number(change),
          });
          setBalance(balance - Number(change));
          setCost(cost + Number(change));
        }
        break;
      case "strength":
        if (newStats.strength >= 100 && Number(change) > 0) {
          return;
        } else if (
          Number(newStats.strength) + Number(change) <
          minStats.strength
        ) {
          return;
        } else {
          setNewStats({
            ...newStats,
            strength: Number(newStats.strength) + Number(change),
          });
          setBalance(balance - Number(change));
          setCost(cost + Number(change));
        }
        break;
      case "accuracy":
        if (newStats.accuracy >= 100 && Number(change) > 0) {
          return;
        } else if (
          Number(newStats.accuracy) + Number(change) <
          minStats.accuracy
        ) {
          return;
        } else {
          setNewStats({
            ...newStats,
            accuracy: Number(newStats.accuracy) + Number(change),
          });
          setBalance(balance - Number(change));
          setCost(cost + Number(change));
        }
        break;
      case "defense":
        if (newStats.defense >= 100 && Number(change) > 0) {
          return;
        } else if (
          Number(newStats.defense) + Number(change) <
          minStats.defense
        ) {
          return;
        } else {
          setNewStats({
            ...newStats,
            defense: Number(newStats.defense) + Number(change),
          });
          setBalance(balance - Number(change));
          setCost(cost + Number(change));
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    loadCardDataAndBalance();
  }, []);

  const resetStats = () => {
    setNewStats(minStats);
    setCost(0);
    setBalance(originalBalance);
  };

  const makePurchase = async () => {
    await UPGRADE_CARD(
      props.cardsRef.doc(props.id),
      props.userRef,
      Number(newStats.health) - Number(minStats.health),
      Number(newStats.strength) - Number(minStats.strength),
      Number(newStats.accuracy) - Number(minStats.accuracy),
      Number(newStats.defense) - Number(minStats.defense)
    ).then(() => {
      navigate("/my-cards");
    });
  };

  return (
    <div className="page">
      <h4>Update the {cardData.name ? cardData.name : null} card.</h4>
      <p>You have {balance} xp points left.</p>
      <div className="upgrade-card-before-screen">
        <h4>Your card has these stats: </h4>
        <p className="card-upgrade-stat">Health: {minStats.health}</p>
        <p className="card-upgrade-stat">Strength: {minStats.strength}</p>
        <p className="card-upgrade-stat">Accuracy: {minStats.accuracy}</p>
        <p className="card-upgrade-stat">Defense: {minStats.defense}</p>
      </div>
      <div className="upgrade-card-after-screen">
        <h4>Your card will upgrade to have these stats: </h4>
        <p className="card-upgrade-stat">Health: {newStats.health}</p>
        <p className="card-upgrade-stat">Strength: {newStats.strength}</p>
        <p className="card-upgrade-stat">Accuracy: {newStats.accuracy}</p>
        <p className="card-upgrade-stat">Defense: {newStats.defense}</p>
      </div>
      <div className="upgrade-buttons">
        <button className="upgrader" onClick={() => upgradeStat("health", 1)}>
          +1 Health
        </button>
        <button className="upgrader" onClick={() => upgradeStat("strength", 1)}>
          +1 Strength
        </button>
        <button className="upgrader" onClick={() => upgradeStat("accuracy", 1)}>
          +1 Accuracy
        </button>
        <button className="upgrader" onClick={() => upgradeStat("defense", 1)}>
          +1 Defense
        </button>
      </div>
      <div className="downgrade-buttons">
        <button
          className="downgrader"
          onClick={() => upgradeStat("health", -1)}
        >
          -1 Health
        </button>
        <button
          className="downgrader"
          onClick={() => upgradeStat("strength", -1)}
        >
          -1 Strength
        </button>
        <button
          className="downgrader"
          onClick={() => upgradeStat("accuracy", -1)}
        >
          -1 Accuracy
        </button>
        <button
          className="downgrader"
          onClick={() => upgradeStat("defense", -1)}
        >
          -1 Defense
        </button>
        <button className="reset-button" onClick={() => resetStats()}>
          Reset
        </button>
      </div>
      <div className="make-purchase-button" onClick={() => makePurchase()}>
        Confirm Purchase for {cost} xp points.
      </div>
    </div>
  );
};

export default UpgradeCardPage;
