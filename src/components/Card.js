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
      <div className='win-loss-ratio'>
        <p className='card-stat'>
          Wins: {props.card.victories ? props.card.victories.length : 0}
        </p>
        <p className='card-stat'>
          Losses: {props.card.defeats ? props.card.defeats.length : 0}
        </p>
      </div>
    </div>
  );
};

export default Card;
