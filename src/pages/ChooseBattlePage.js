import React from "react";
import { useNavigate } from "react-router-dom";
import '../styling/ChooseBattlePage.css';

const ChooseBattlePage = () => {
  const navigate = useNavigate();

  const selectDifficulty = (level) => {
    navigate(`/computer-battle-${level}`);
  };

  return (
    <div className="page">
      <div className="choose-difficulty-screen">
        <h2>Choose a level of difficulty:</h2>
        <div className='difficulty-buttons'>
          <button
            className="choose-difficulty-button"
            id='beginner'
            onClick={() => selectDifficulty("beginner")}
          >
            Beginner
          </button>
          <button
            className="choose-difficulty-button"
            id="novice"
            onClick={() => selectDifficulty("novice")}
          >
            Novice
          </button>
          <button
            className="choose-difficulty-button"
            id='proficient'
            onClick={() => selectDifficulty("proficient")}
          >
            Proficient
          </button>
          <button
            className="choose-difficulty-button"
            id='expert'
            onClick={() => selectDifficulty("expert")}
          >
            Expert
          </button>
          <button
            className="choose-difficulty-button"
            id='master'
            onClick={() => selectDifficulty("master")}
          >
            Master
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseBattlePage;
