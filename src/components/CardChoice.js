import React from "react";

const CardChoice = (props) => {
  return (
    <div className="card-choice" onClick={() => props.chooseCard(props.text)}>
      {props.text}
    </div>
  );
};

export default CardChoice;
