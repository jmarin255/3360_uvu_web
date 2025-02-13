
import React,{useState} from 'react';
import './About.css';
import nba from '../assets/nba.png';
import nfl from '../assets/nfl.png';
import mlb from '../assets/mlb.png';
import nhl from '../assets/nhl.png'
// Import more league logos as needed

const MovingStrip = () => {
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseEnter = () => {
    setIsMoving(true);
  };

  const handleMouseLeave = () => {
    setIsMoving(false);
  };

  return (
    <div 
      className="strip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`strip ${isMoving ? 'moving' : ''}`}>
        <img src={nba} alt="nba" />
        <img src={nfl} alt="nfl" />
        <img src={mlb} alt="mlb" />
        <img src={nhl} alt="nhl" />

        {/* Add more logos as needed */}
      </div>
    </div>
  );
};

export default MovingStrip;