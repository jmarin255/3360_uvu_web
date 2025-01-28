
import aboutim from './tv.png';

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <div className="tv-wrapper">
          <img src={aboutim} alt="TV" className="about-tv" /> 
          <h1 className="about-text about-h1">About This App</h1>
          <p className="about-text about-p">This app provides player props data from various sportsbooks,
            I'm making this since I'm into sports betting and currently all the other apps are
            paid ones so I wanted to make one my own, stay tuned for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;