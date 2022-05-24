import React from "react";
import { useNavigate } from "react-router-dom";

const ChooseBattlePage = () => {
  const navigate = useNavigate();

  const selectDifficulty = (level) => {
    navigate(`/computer-battle-${level}`);
  };

  return (
    <div className="page">
      <div className="choose-difficulty-screen">
        <h2>Choose a level of difficulty:</h2>
        <button
          className="choose-difficulty-button"
          onClick={() => selectDifficulty("beginner")}
        >
          Beginner
        </button>
        <button
          className="choose-difficulty-button"
          onClick={() => selectDifficulty("novice")}
        >
          Novice
        </button>
        <button
          className="choose-difficulty-button"
          onClick={() => selectDifficulty("proficient")}
        >
          Proficient
        </button>
        <button
          className="choose-difficulty-button"
          onClick={() => selectDifficulty("expert")}
        >
          Expert
        </button>
        <button
          className="choose-difficulty-button"
          onClick={() => selectDifficulty("master")}
        >
          Master
        </button>
      </div>
    </div>
  );
};

export default ChooseBattlePage;
