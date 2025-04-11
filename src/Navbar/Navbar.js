import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn,  FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Hostel Manager</h2>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/students" onClick={closeMenu}>Students</Link></li>
        <li><Link to="/add-student" onClick={closeMenu}>Add Student</Link></li>
        <li><Link to="/phonepay" onClick={closeMenu}>Phonepay</Link></li>
        <li><Link to="/room-status" onClick={closeMenu}>Room Status</Link></li>

        {/* Rooms Dropdown */}
        <li className="dropdown">
          <span className="dropbtn">Rooms</span>
          <div className="dropdown-content">
            <Link to="/rooms" onClick={closeMenu}>Add Room</Link>
            <Link to="/getrooms" onClick={closeMenu}>Get Rooms</Link>
          </div>
        </li>

        {/* Login Only */}
        <li className="dropdown login-dropdown">
          <span className="dropbtn login-icon">
            <FiLogIn size={20} />
            <span className="login-text">Login</span>
          </span>
          <div className="dropdown-content">
            <Link to="/login" onClick={closeMenu}>Login</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
