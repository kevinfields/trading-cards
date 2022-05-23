import React from 'react';
import '../styling/Card.css';

const Card = (props) => {
  return (
    <div className='card'>
      <p className='card-name'>{props.card.name}</p>
      <p className='card-stat'>Health: {props.card.health}</p>
      <p className='card-stat'>Strength: {props.card.strength}</p>
      <p className='card-stat'>Defense: {props.card.defense}</p>
      <p className='card-stat'>Accuracy: {props.card.accuracy}</p>
    </div>
  )
}

export default Card