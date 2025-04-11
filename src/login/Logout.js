// components/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage or any stored session tokens
    localStorage.clear();

    // Navigate to login page
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
