import React, { useState } from "react";

const StatBar = (props) => {
  const [bar, setBar] = useState(true);

  const changeForm = () => {
    setBar(!bar);
  };

  return (
    <div className="single-stat-bar" onClick={props.blockValueForm ? null : () => changeForm()}>
      <div className="stat-title">{props.title}: </div>
      {bar ? (
        <div
          className="bar-form"
          style={{
            width: props.width,
            height: "2.2vh",
          }}
        >
          {props.value}
        </div>
      ) : (
        <div className="value-form">{props.value} / 100</div>
      )}
    </div>
  );
};

export default StatBar;
