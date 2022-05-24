import React, { useState, useEffect, useRef } from "react";
import Battler from "../components/Battler";
import "../styling/ComputerBattlePage.css";

const ComputerBattlePage = (props) => {
  const [phase, setPhase] = useState(0);
  const [attacking, setAttacking] = useState("computer");
  const [attacker, setAttacker] = useState({
    health: props.attackerCard.health,
    strength: props.attackerCard.strength,
    accuracy: props.attackerCard.accuracy,
    defense: props.attackerCard.defense,
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
  const dummy = useRef();

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

  useEffect(() => {
    dummy.current.focus();
  }, []);

  useEffect(() => {
    if (positionChange !== "") {
      setPositionChange("");
    }
  }, [positionChange]);

  useEffect(() => {
    //lord forgive me for this
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

  return (
    <div className="page">
      <div className="battle-screen">
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
