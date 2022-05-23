import React from "react";
import getBarWidth from "../functions/getBarWidth";
import "../styling/Card.css";
import StatBar from "./StatBar";

const Card = (props) => {
  return (
    <div className="card">
      <p className="card-name">{props.card.name}</p>
      <p className="card-stat">
        <StatBar
          value={props.card.health}
          width={getBarWidth(props.card.health)}
          title="Health"
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.strength}
          width={getBarWidth(props.card.strength)}
          title="Strength"
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.defense}
          width={getBarWidth(props.card.defense)}
          title="Defense"
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.accuracy}
          width={getBarWidth(props.card.accuracy)}
          title="Accuracy"
        />
      </p>
    </div>
  );
};

export default Card;
