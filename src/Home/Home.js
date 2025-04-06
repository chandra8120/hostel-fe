import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // External CSS

const Home = () => {
  return (
    <div className="home-container">

      <header className="hero">
        <h1>Welcome to Hostel Manager</h1>
        <p>Manage students, rooms, and records efficiently</p>
        <Link to="/students" className="cta-btn">View Students</Link>
      </header>
    </div>
  );
};

export default Home;
