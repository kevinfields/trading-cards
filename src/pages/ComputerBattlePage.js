import React, { useState, useEffect, useRef } from "react";
import Battler from "../components/Battler";
import CardChoice from "../components/CardChoice";
import calculateHit from "../functions/calculateHit";
import ADD_BATTLE from "../reducers/ADD_BATTLE";
import ADD_LOSS from "../reducers/ADD_LOSS";
import ADD_WIN from "../reducers/ADD_WIN";
import "../styling/ComputerBattlePage.css";

const ComputerBattlePage = (props) => {
  const [cardRef, setCardRef] = useState("");
  const [cardId, setCardId] = useState("");
  const [choices, setChoices] = useState([]);
  const [attacker, setAttacker] = useState({
    health: 1,
    strength: 0,
    accuracy: 0,
    defense: 0,
  });
  const [defender, setDefender] = useState({
    health: props.defenderCard.health,
    strength: props.defenderCard.strength,
    accuracy: props.defenderCard.accuracy,
    defense: props.defenderCard.defense,
  });
  const [position, setPosition] = useState({
    attackerX: 20,
    attackerY: 20,
    defenderX: 70,
    defenderY: 70,
  });
  const [positionChange, setPositionChange] = useState("");
  const [allow, setAllow] = useState(true);
  const [timeoutId, setTimeoutId] = useState("");
  const dummy = useRef();

  const userRef = props.firestore.collection("users").doc(props.user.uid);
  const allCardsRef = props.firestore.collection("cards");
  const opponentRef = props.firestore.collection("users").doc("computer");
  const opponentCardRef = props.firestore
    .collection("cards")
    .doc(props.computerCardId);
  const battleRef = props.firestore.collection("battles");
  const positionChanger = (key) => {
    if (key === "") {
      return;
    }
    switch (key.toLowerCase()) {
      case "a":
        setPosition({
          ...position,
          attackerX: position.attackerX - 1,
        });
        break;
      case "d":
        setPosition({
          ...position,
          attackerX: position.attackerX + 1,
        });
        break;
      case "w":
        setPosition({
          ...position,
          attackerY: position.attackerY + 2,
        });
        break;
      case "s":
        setPosition({
          ...position,
          attackerY: position.attackerY - 2,
        });
        break;
      default:
        break;
    }
  };

  const chooseCard = async () => {
    let choices = [];
    let objects = [];
    await userRef.get().then((doc) => {
      choices = doc.data().cards;
    });
    for (let i = 0; i < choices.length; i++) {
      await allCardsRef
        .doc(choices[i])
        .get()
        .then((doc) => {
          objects.push({
            id: choices[i],
            name: doc.data().name,
          });
        });
    }
    setChoices(objects);
  };

  useEffect(() => {
    dummy.current.focus();
    chooseCard();
  }, []);

  useEffect(() => {
    if (positionChange !== "") {
      setPositionChange("");
    }
  }, [positionChange]);

  useEffect(() => {
    if (position.attackerX < 20 || position.attackerX > 85) {
      setPosition({
        ...position,
        attackerX: 20,
      });
    }

    if (position.attackerY < 5 || position.attackerY > 75) {
      setPosition({
        ...position,
        attackerY: 5,
      });
    }
  }, [position]);

  const makeChoice = async (card) => {
    let reference = props.firestore.collection("cards").doc(card);
    let data;
    setCardRef(reference);
    setCardId(card);
    await reference
      .get()
      .then((doc) => {
        data = doc.data();
      })
      .then(() => {
        setAttacker({
          health: data.health,
          strength: data.strength,
          accuracy: data.accuracy,
          defense: data.defense,
        });
        setAllow(true);
        setChoices([]);
      });
  };

  const newRound = (style) => {
    if (!allow) {
      return;
    }
    setAllow(false);
    let hit = calculateHit(
      attacker.strength,
      attacker.accuracy,
      defender.defense,
      defender.accuracy
    );
    let rally = calculateHit(
      defender.strength,
      defender.accuracy,
      attacker.defense,
      attacker.accuracy
    );
    console.log("baseHit: " + hit);
    switch (style) {
      case "slash":
        setDefender({
          ...defender,
          health: defender.health - hit * 2,
        });
        break;
      case "stab":
        setDefender({
          ...defender,
          health: defender.health - hit,
          accuracy: defender.accuracy - hit,
        });
        break;
      case "crush":
        setDefender({
          ...defender,
          health: defender.health - hit,
          strength: defender.strength - hit,
        });
        break;
      default:
        break;
    }
    setTimeoutId(
      setTimeout(() => {
        setAttacker({
          ...attacker,
          health: attacker.health - rally,
        });
        setAllow(true);
      }, [1000])
    );
  };

  const restartGame = () => {
    setAllow(false);
    setDefender({
      health: props.defenderCard.health,
      strength: props.defenderCard.strength,
      accuracy: props.defenderCard.accuracy,
      defense: props.defenderCard.defense,
    });
    setAttacker({
      health: 1,
      strength: 0,
      accuracy: 0,
      defense: 0,
    });
    setCardId("");
    setCardRef("");
    dummy.current.focus();
    chooseCard();
  };

  useEffect(() => {
    if (attacker.health <= 0) {
      clearTimeout(timeoutId);
      ADD_LOSS(userRef, cardRef, props.computerCardId);
      ADD_WIN(opponentRef, opponentCardRef, cardId);
      ADD_BATTLE(
        battleRef,
        props.user.uid,
        cardId,
        "computer",
        props.computerCardId,
        "computer"
      );
      alert("Sorry, you have lost");
      restartGame();
    }
    if (defender.health <= 0) {
      clearTimeout(timeoutId);
      ADD_WIN(userRef, cardRef, props.computerCardId);
      ADD_LOSS(opponentRef, opponentCardRef, cardId);
      ADD_BATTLE(
        battleRef,
        props.user.uid,
        cardId,
        "computer",
        props.computerCardId,
        props.user.uid
      );
      alert("Congratulations, you win!");
      restartGame();
    }
  }, [attacker, defender]);

  return (
    <div className="page">
      <div className="battle-screen">
        {choices.length > 0 ? (
          <div className="choose-card-screen">
            <p className="card-screen-header">Choose one of your cards</p>
            {choices.length > 0 &&
              choices.map((item) => (
                <CardChoice
                  text={item.name}
                  id={item.id}
                  chooseCard={(choice) => makeChoice(choice)}
                />
              ))}
          </div>
        ) : null}
        <div className="attack-buttons">
          <button onClick={() => newRound("slash")}>Slash</button>
          <button onClick={() => newRound("stab")}>Stab</button>
          <button onClick={() => newRound("crush")}>Crush</button>
        </div>
        <input
          type="text"
          value={positionChange}
          onChange={(e) => positionChanger(e.target.value)}
          ref={dummy}
          className="battle-input-ref"
        />
        <Battler
          stats={attacker}
          style={{
            position: "fixed",
            left: `${position.attackerX}vw`,
            bottom: `${position.attackerY}vh`,
          }}
        />
        <Battler
          stats={defender}
          style={{
            position: "fixed",
            left: `${position.defenderX}vw`,
            bottom: `${position.defenderY}vh`,
          }}
        />
      </div>
    </div>
  );
};

export default ComputerBattlePage;
