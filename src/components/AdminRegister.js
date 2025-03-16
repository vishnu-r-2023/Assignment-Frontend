import React, { useState } from 'react';
import { registerAdmin } from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      console.log('Registration request:', { username, password }); // Debugging
      const response = await registerAdmin({ username, password });
      console.log('Registration response:', response.data); // Debugging
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/admin'), 2000);
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message); // Debugging
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="admin-register">
      <h1>Admin Registration</h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AdminRegister;
