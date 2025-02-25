import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import real from '../assets/real.png'
import comp from '../assets/comp.png'
import alert from '../assets/alert.png'

const Home = () => {
  return (
    <MainLayout>
      <div className="home">
        <h1>
          Bet <span className="gradient-text">Smarter</span>, not <span className="gradient-text">harder</span>.
        </h1>
        <p>A research tool for player props that will save you time and energy.</p>
        <section className="features">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <i className="feature-icon fas fa-chart-line"></i>
                <h3>Real-time Stats</h3>
                <img src={real} alt="Real-time Stats Icon" className="icon"/>
                <p>Get up-to-date statistics for players and teams.</p>
              </div>
              <div className="col-md-4">
                <i className="feature-icon fas fa-user-friends"></i>
                <h3>Player Comparisons</h3>
                <img src={comp} alt="Player Comparisons Icon" className='icon' />
                <p>Compare player performances and make informed decisions.</p>
              </div>
              <div className="col-md-4">
                <i className="feature-icon fas fa-bell"></i>
                <h3>Instant Alerts</h3>
                <img src={alert} alt="Instant Alerts Icon" className='icon' />
                <p>Receive notifications for key events and updates.</p>
              </div>
            </div>
          </div>
        </section>
        <Link to="/about">
          <button className="about-button">About Page</button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;