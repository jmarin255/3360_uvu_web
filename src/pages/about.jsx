import React from 'react';
import './About.css';
import MainLayout from '../layouts/MainLayout';
import basket from '../assets/bask.gif';
import MovingStrip from './MovingStrip'; 

const About = () => {
  return (
    <MainLayout title="about">
      <div className="about">
        <div className="about-content">
          <h1 className="about-text about-h1">About This App</h1>
          <p className="about-text about-p">
            This app provides player props data from various sportsbooks,
            I'm making this since I'm into sports betting and currently all the other apps are
            paid ones so I wanted to make one my own, stay tuned for updates.
            <img src={basket} alt="Real-time Stats Icon" className="basket" />
          </p>
         
          <section className="moving-strip">
            <h2 className='about-text about-h1'>Leagues that will be supported</h2>
            <p>(Put cursor inside the box c: )</p>
            <MovingStrip />
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;