import React, { useState } from "react";

const StatBar = (props) => {
  const [bar, setBar] = useState(true);

  const changeForm = () => {
    setBar(!bar);
  };

  return (
    <div className="single-stat-bar" onClick={() => changeForm()}>
      <div className="stat-title">{props.title}: </div>
      {bar ? (
        <div
          className="bar-form"
          style={{
            background: "red",
            width: props.width,
            height: "2vh",
          }}
        />
      ) : (
        <div className="value-form">{props.value} / 100</div>
      )}
    </div>
  );
};

export default StatBar;
