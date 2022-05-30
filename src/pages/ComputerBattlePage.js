import React, { useState, useEffect, useRef } from "react";
import Battler from "../components/Battler";
import CardChoice from "../components/CardChoice";
import HitSplat from "../components/HitSplat";
import LoadingScreen from "../components/LoadingScreen";
import calculateHeal from "../functions/calculateHeal";
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
    strength: 1,
    accuracy: 1,
    defense: 1,
  });
  const [attackerMax, setAttackerMax] = useState({
    health: 1,
    strength: 1,
    accuracy: 1,
    defense: 1,
  })
  const [defender, setDefender] = useState({
    health: props.defenderCard.health,
    strength: props.defenderCard.strength,
    accuracy: props.defenderCard.accuracy,
    defense: props.defenderCard.defense,
  });

  const [defenderMax, setDefenderMax] = useState({
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
  const [allow, setAllow] = useState(false);
  const [timeoutId, setTimeoutId] = useState("");
  const [splatTimeoutId, setSplatTimeoutId] = useState("");
  const [round, setRound] = useState(0);
  const [hitSplat, setHitSplat] = useState({
    damage: 0,
    player: "",
  });
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
        // eslint-disable-next-line no-loop-func
        .then((doc) => {
          objects.push({
            id: choices[i],
            name: doc.data().name,
            health: doc.data().health,
            strength: doc.data().strength,
            accuracy: doc.data().accuracy,
            defense: doc.data().defense,
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
    dummy.current.focus();
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
        setAttackerMax({
          health: data.health,
          strength: data.strength,
          accuracy: data.accuracy,
          defense: data.defense,
        });

        setAllow(true);
        setChoices([]);
        setRound(1);
      });
  };

  const newRound = (style) => {
    dummy.current.focus();
    if (!allow) {
      return;
    }
    let newHealth = -1;
    clearTimeout(splatTimeoutId);
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
    switch (style) {
      case "slash":
        setDefender({
          ...defender,
          health: defender.health - hit,
        });
        setHitSplat({
          damage: hit,
          player: "computer",
        });
        break;
      case "stab":
        setDefender({
          ...defender,
          health: defender.health - Math.ceil(hit / 2),
          accuracy: defender.accuracy - Math.ceil(hit / 2),
        });
        setHitSplat({
          damage: hit,
          player: "computer",
        });
        break;
      case "crush":
        setDefender({
          ...defender,
          health: defender.health - Math.ceil(hit / 2),
          strength: defender.strength - Math.ceil(hit / 2),
        });
        setHitSplat({
          damage: hit,
          player: "computer",
        });
        break;
      case 'heal':
        newHealth = calculateHeal(attacker.health, attackerMax.health)
        setAttacker({
          ...attacker,
          health: newHealth,
        });
        break;
      default:
        break;
    }
    setTimeoutId(
      setTimeout(() => {
        setHitSplat({
          damage: rally,
          player: "player",
        });
        setAttacker({
          ...attacker,
          health: (newHealth === -1 ? attacker.health - rally : newHealth - rally),
        });
        setAllow(true);
        setRound(round + 1);
      }, [1000])
    );
  };

  useEffect(() => {
    if (hitSplat.player === "player") {
      setSplatTimeoutId(
        setTimeout(() => {
          setHitSplat({
            damage: 0,
            player: "",
          });
        }, [1000])
      );
    }
  }, [hitSplat]);

  const restartGame = () => {
    setRound(0);
    setAllow(false);
    setDefender({
      health: props.defenderCard.health,
      strength: props.defenderCard.strength,
      accuracy: props.defenderCard.accuracy,
      defense: props.defenderCard.defense,
    });
    setAttacker({
      health: 1,
      strength: 1,
      accuracy: 1,
      defense: 1,
    });
    setCardId("");
    setCardRef("");
    setHitSplat({
      damage: 0,
      player: "",
    });
    dummy.current.focus();
    setPosition({
      attackerX: 20,
      attackerY: 20,
      defenderX: 70,
      defenderY: 70,
    })
    chooseCard();
  };

  useEffect(() => {
    if (attacker.health <= 0) {
      clearTimeout(timeoutId);
      ADD_LOSS(userRef, cardRef, props.computerCardId);
      ADD_WIN(opponentRef, opponentCardRef, cardId, round);
      ADD_BATTLE(
        battleRef,
        props.user.uid,
        cardId,
        "computer",
        props.computerCardId,
        "computer",
        round,
        new Date(),
      );
      alert(`Sorry, you have lost. You earned an xp point anyways.`);
      restartGame();
    }
    if (defender.health <= 0) {
      clearTimeout(timeoutId);
      ADD_WIN(userRef, cardRef, props.computerCardId, round);
      ADD_LOSS(opponentRef, opponentCardRef, cardId);
      ADD_BATTLE(
        battleRef,
        props.user.uid,
        cardId,
        "computer",
        props.computerCardId,
        props.user.uid,
        round,
        new Date(),
      );
      const textOptions = ['computerBeginner', 'computerNovice', 'computerProficient', 'computerExpert', 'computerMaster'];
      const pointValue = textOptions.indexOf(props.computerCardId) + 1;
      const finalValue = pointValue * Math.ceil(round / 5);
      alert(`Congratulations, you win! You earned ${finalValue} xp points for winning against ${props.computerCardId} in ${round} rounds.`);
      restartGame();
    }
  }, [attacker, defender]);

  return (
    <div className="page">
      {round > 0 ? <h3 className="round-title">Round {round}</h3> : null}
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
                  key={item.id}
                  stats={{
                    health: item.health,
                    strength: item.strength,
                    accuracy: item.accuracy,
                    defense: item.defense,
                  }}
                />
              ))}
          </div>
        ) : choices.length === 0 && round === 0 ? (
          <LoadingScreen />
        ) : null}
        <div className="attack-buttons">
          {allow ? (
            <>
              <button onClick={() => newRound("slash")}>Slash</button>
              <button onClick={() => newRound("stab")}>Stab</button>
              <button onClick={() => newRound("crush")}>Crush</button>
              <button onClick={() => newRound('heal')}>Heal</button>
            </>
          ) : null}
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
          playerType="player"
        />
        <Battler
          stats={defender}
          style={{
            position: "fixed",
            left: `${position.defenderX}vw`,
            bottom: `${position.defenderY}vh`,
          }}
          playerType="computer"
        />
        {hitSplat.player !== "" ? (
          <HitSplat
            damage={hitSplat.damage}
            x={
              hitSplat.player === "player"
                ? position.attackerX
                : position.defenderX
            }
            y={
              hitSplat.player === "player"
                ? position.attackerY
                : position.defenderY
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default ComputerBattlePage;
