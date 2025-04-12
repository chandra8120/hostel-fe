import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(null);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setMenuOpen(false);
      setDropdownOpen(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    closeMenu();
    navigate('/logout');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">Hostel Manager</h2>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </div>

      <ul className={`nav-links ${menuOpen && isMobile ? 'slide-in' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/students" onClick={closeMenu}>Students</Link></li>
        <li><Link to="/add-student" onClick={closeMenu}>Add Student</Link></li>
        <li><Link to="/phonepay" onClick={closeMenu}>Phonepay</Link></li>
        <li><Link to="/room-status" onClick={closeMenu}>Room Status</Link></li>

        <li className="dropdown">
          <span className="dropbtn" onClick={() => toggleDropdown("rooms")}>Rooms</span>
          <div className={`dropdown-content ${dropdownOpen === "rooms" ? "show" : ""}`}>
            <Link to="/rooms" onClick={closeMenu}>Add Room</Link>
            <Link to="/getrooms" onClick={closeMenu}>Get Rooms</Link>
          </div>
        </li>

        {/* Login/Profile Dropdown */}
        <li className="dropdown login-dropdown">
          <span className="dropbtn login-icon" onClick={() => toggleDropdown("login")}>
            <FiLogIn size={20} />
            <span className="login-text">Profile</span>
          </span>
          <div className={`dropdown-content ${dropdownOpen === "login" ? "show" : ""}`}>
            {isLoggedIn ? (
              <span onClick={handleLogout} style={{ cursor: 'pointer', padding: '10px', display: 'block' }}>
                Logout
              </span>
            ) : (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
