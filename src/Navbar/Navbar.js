import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUser, FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
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

        {/* Login/Profile Dropdown */}
        <li className="dropdown login-dropdown">
          <span className="dropbtn login-icon">
            {isLoggedIn ? <FiUser size={20} /> : <FiLogIn size={20} />}
            <span className="login-text">{isLoggedIn ? 'Account' : 'Login'}</span>
          </span>
          <div className="dropdown-content">
            {!isLoggedIn ? (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            ) : (
              <>
                <Link to="/profile" onClick={closeMenu}>Profile</Link>
                <Link to="/logout" onClick={closeMenu}>Logout</Link>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
