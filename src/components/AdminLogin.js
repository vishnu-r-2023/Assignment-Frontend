import React, { useState } from 'react';
import { loginAdmin } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Login request:', { username, password }); // Debugging
      const response = await loginAdmin({ username, password });
      console.log('Login response:', response.data); // Debugging
      localStorage.setItem('adminToken', response.data.token); // Store the token
      console.log('Admin token saved to localStorage:', response.data.token); // Debugging
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message); // Debugging
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/admin/register">Register here</Link>
      </p>
    </div>
  );
}

export default AdminLogin;
