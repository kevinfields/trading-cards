import React from "react";
import "../styling/UserTab.css";

const UserTab = (props) => {
  return (
    <div className="user-tab">
      <p className="tab-stat">{props.user.name}</p>
      <p className="tab-stat">Total XP: {props.user.xpTotal}</p>
      <p className="tab-stat">Number of Cards: {props.user.cards.length}</p>
      <p className="cards-link" onClick={() => props.onChange()}>
        View Cards
      </p>
    </div>
  );
};

export default UserTab;
