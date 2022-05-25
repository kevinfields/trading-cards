import React from "react";
import "../styling/UserTab.css";

const UserTab = (props) => {
  return (
    <div className="user-tab">
      <p className="tab-id">{props.user.id}</p>
      <p className="tab-stat">{props.user.name}</p>
      <p className="tab-stat">Total XP: {props.user.xpTotal}</p>
      <p className="tab-stat">Number of Cards: {props.user.cards.length}</p>
      <p className="cards-link" onClick={() => props.onLookupCards()}>
        View Cards
      </p>
      <p className="profile-link" onClick={() => props.onLookupUser()}>
        View Profile
      </p>
    </div>
  );
};

export default UserTab;
