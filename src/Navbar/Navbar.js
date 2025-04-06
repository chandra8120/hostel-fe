import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Hostel Manager</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/add-student">Add Student</Link></li>
        <li><Link to="/rooms">Rooms</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
