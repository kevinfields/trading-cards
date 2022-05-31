import React from "react";
import "../styling/HitSplat.css";

const HitSplat = (props) => {
  return (
    <div
      className="hit-splat"
      style={{
        position: "fixed",
        left: `${props.x - 2}vw`,
        bottom: `${props.y - 5}vh`,
        textAlign: 'center',
      }}
    >
      {props.damage}
    </div>
  );
};

export default HitSplat;
