
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './index.css'; 
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import Boostrap from './pages/boostrap.jsx';
import Events from './pages/events.jsx';
import Projections from './pages/Projections.jsx';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projections" element={<Projections/>}/>
        <Route NotFound="*" element={<NotFound />} />
        <Route path="/boostrap" element={<Boostrap/>}/>
        <Route path="/events" element={<Events/>}/>

      </Routes>
  
  );
}

export default App;