import React, { useState, useEffect } from "react";
import "../styling/MakeCardPage.css";
import getTotalStats from "../functions/getTotalStats";
import MAKE_CARD from "../reducers/MAKE_CARD";

//cards should be made using a combination of the xpTotal and xpRemaining values stored
//in the creators user document in firebase. Before gaining xp, the player can make low
//levelled cards that use no xp and can have up to 50 points total combined across stats.

const MakeCardPage = (props) => {
  const userRef = props.firestore.collection("users").doc(props.user.uid);
  const cardsRef = props.firestore.collection("cards");

  const [stats, setStats] = useState({
    health: 0,
    strength: 0,
    defense: 0,
    accuracy: 0,
    name: "",
    creatorId: props.user.uid,
  });
  const [maxStats, setMaxStats] = useState(0);
  const [remainingStats, setRemainingStats] = useState(0);

  const uploadCard = async () => {

    if (stats.name === "") {
      alert("You must name your character!");
      return;
    }
    if (!window.confirm("Are you sure? This action is final.")) {
      return;
    }
    let cardObject = {
      ...stats,
      ownerId: props.user.uid,
      creatorId: props.user.uid,
      ownerList: [props.user.uid],
      victories: [],
      defeats: [],
      totalBattles: [],
    };
    await MAKE_CARD(cardObject, userRef, cardsRef, getTotalStats(cardObject)).then(() => {
      props.nav("/my-cards");
    });
  };

  const getMaxStats = async () => {
    await userRef.get().then((doc) => {
      setMaxStats(doc.data().xpRemaining + 100);
      setRemainingStats(doc.data().xpRemaining + 100);
    });
  };

  useEffect(() => {
    getMaxStats();
    setStats({
      name: "",
      accuracy: 0,
      strength: 0,
      defense: 0,
      health: 0,
    });
  }, []);

  useEffect(() => {
    if (maxStats !== 0) {
      let total = getTotalStats(stats);
      setRemainingStats(Number(maxStats) - Number(total));
    }
  }, [stats]);

  useEffect(() => {
    if (stats.name.length > 15) {
      setStats({
        ...stats,
        name: stats.name.substring(0, 15),
      });
    }
  }, [stats.name]);

  // There must be an easier way to do this but I'm going with it.

  useEffect(() => {
    let count = Number(getTotalStats(stats));
    console.log(count);
    if (count > maxStats) {
      let offset = Number(count - maxStats);
      setStats({
        ...stats,
        health: Number(stats.health - offset),
      });
    }

    if (stats.health < 0) {
      setStats({
        ...stats,
        health: 0,
      });
    }
    if (stats.health > 100) {
      setStats({
        ...stats,
        health: 100,
      });
    }
  }, [stats.health]);

  useEffect(() => {
    let count = Number(getTotalStats(stats));
    console.log(count);
    if (count > maxStats) {
      let offset = Number(count - maxStats);
      setStats({
        ...stats,
        strength: Number(stats.strength - offset),
      });
    }

    if (stats.strength < 0) {
      setStats({
        ...stats,
        strength: 0,
      });
    }
    if (stats.strength > 100) {
      setStats({
        ...stats,
        strength: 100,
      });
    }
  }, [stats.strength]);

  useEffect(() => {
    let count = Number(getTotalStats(stats));
    console.log(count);
    if (count > maxStats) {
      let offset = Number(count - maxStats);
      setStats({
        ...stats,
        defense: Number(stats.defense - offset),
      });
    }

    if (stats.defense < 0) {
      setStats({
        ...stats,
        defense: 0,
      });
    }
    if (stats.defense > 100) {
      setStats({
        ...stats,
        defense: 100,
      });
    }
  }, [stats.defense]);

  useEffect(() => {
    let count = Number(getTotalStats(stats));
    console.log(count);
    if (count > maxStats) {
      let offset = Number(count - maxStats);
      setStats({
        ...stats,
        accuracy: Number(stats.accuracy - offset),
      });
    }

    if (stats.accuracy < 0) {
      setStats({
        ...stats,
        accuracy: 0,
      });
    }
    if (stats.accuracy > 100) {
      setStats({
        ...stats,
        accuracy: 100,
      });
    }
  }, [stats.accuracy]);

  return (
    <div className="page">
      This is where the user would make cards for the trading card game.
      <div className="remaining-stats-message">
        <p>You have {maxStats} points total to spend.</p>
        <p>You have {remainingStats} points left to spend.</p>
      </div>
      <div className="set-stats-screen">
        <div className="stat-inputs">
          Name:
          <input
            value={stats.name}
            type="text"
            maxLength="15"
            onChange={(e) =>
              setStats({
                ...stats,
                name: e.target.value,
              })
            }
          />
          Health:
          <input
            value={stats.health}
            type="number"
            onChange={(e) =>
              setStats({
                ...stats,
                health: e.target.value,
              })
            }
          />
          Strength:
          <input
            value={stats.strength}
            type="number"
            onChange={(e) =>
              setStats({
                ...stats,
                strength: e.target.value,
              })
            }
          />
          Defense:
          <input
            value={stats.defense}
            type="number"
            onChange={(e) =>
              setStats({
                ...stats,
                defense: e.target.value,
              })
            }
          />
          Accuracy:
          <input
            value={stats.accuracy}
            type="number"
            onChange={(e) =>
              setStats({
                ...stats,
                accuracy: e.target.value,
              })
            }
          />
        </div>
        <button className="upload-card-button" onClick={() => uploadCard()}>
          Make Card
        </button>
      </div>
    </div>
  );
};

export default MakeCardPage;
