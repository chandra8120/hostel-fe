import React, { useState } from 'react';
import { API_URL } from '../api.config';
import './login.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login Successful');
        localStorage.setItem('token', data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
