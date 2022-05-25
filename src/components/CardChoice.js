import React from "react";
import "../styling/CardChoice.css";

const CardChoice = (props) => {
  return (
    <div className="card-choice" onClick={() => props.chooseCard(props.id)}>
      <div className="card-choice-single-value">{props.text}</div>
      <div className="card-choice-single-value">
        Health: {props.stats.health}
      </div>
      <div className="card-choice-single-value">
        Strength: {props.stats.strength}
      </div>
      <div className="card-choice-single-value">
        Accuracy: {props.stats.accuracy}
      </div>
      <div className="card-choice-single-value">
        Defense: {props.stats.defense}
      </div>
    </div>
  );
};

export default CardChoice;
