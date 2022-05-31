import React from "react";
import '../styling/HomePage.css';
import { RULES } from "../data/RULES";


const HomePage = () => {


  return (
    <div className="page" id='home-page'>
      <h2 className='welcome-header'>Generic Trading Card Game</h2>
      <div className='page-break' />
      <h3 className='how-to-play-header'>How to Play: </h3>
      <div className='rules-box'>
        {RULES.map(item => (
          <div className='rule' key={RULES.indexOf(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
