import React from "react";
import "../styling/Battler.css";

const Battler = (props) => {
  return (
    <div className="battler" id={props.playerType} style={props.style}>
      <p className="battler-stat">Health: {props.stats.health}</p>
      <p className="battler-stat">Strength: {props.stats.strength}</p>
      <p className="battler-stat">Defense: {props.stats.defense}</p>
      <p className="battler-stat">Accuracy: {props.stats.accuracy}</p>
      <p className="battler-position">
        {props.style.left} {props.style.bottom}
      </p>
    </div>
  );
};

export default Battler;
