import React from "react";
import getBarWidth from "../functions/getBarWidth";
import "../styling/Card.css";
import StatBar from "./StatBar";

const Card = (props) => {

  let block = false;
  if (props.blockValueForm) {
    block = true;
  }

  return (
    <div className="card">
      <p className="card-name">{props.card.name}</p>
      <p className="card-stat">
        <StatBar
          value={props.card.health}
          width={getBarWidth(props.card.health)}
          title="Health"
          blockValueForm={block}
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.strength}
          width={getBarWidth(props.card.strength)}
          title="Strength"
          blockValueForm={block}
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.defense}
          width={getBarWidth(props.card.defense)}
          title="Defense"
          blockValueForm={block}
        />
      </p>
      <p className="card-stat">
        <StatBar
          value={props.card.accuracy}
          width={getBarWidth(props.card.accuracy)}
          title="Accuracy"
          blockValueForm={block}
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
      {
      props.requestTrade ? 
        <div className='request-trade-button' onClick={() => props.requestTrade()}>
          Request to trade for this card.
        </div>
        : null
      }
      {
      props.onOffer ?
        <div className='offer-trade-button' onClick={() => props.onOffer()}>
          Offer to trade this card.
        </div>
        : null
      }
    </div>
  );
};

export default Card;
