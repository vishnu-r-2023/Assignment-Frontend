import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserClaim from './components/UserClaim';
import AdminLogin from './components/AdminLogin'; // Fixed path
import AdminRegister from './components/AdminRegister'; // Fixed path
import AdminDashboard from './components/AdminDashboard'; // Fixed path
import UserClaimHistory from './components/UserClaimHistory'; // Fixed path
import UserPage from './components/UserPage'; // Fixed path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default page */}
        <Route path="/claim" element={<UserClaim />} /> {/* Guest User Panel */}
        <Route path="/user" element={<UserPage />} /> {/* User Webpage */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/claim-history" element={<UserClaimHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
