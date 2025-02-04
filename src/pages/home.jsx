import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  return (
    <MainLayout>
      <div className="home">
        <h1>Welcome to the Sportspicker App</h1>
        <p>Page it's still under construction, click button for more.</p>
        <Link to="/about">
          <button className='about-button'> About Page</button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Home;