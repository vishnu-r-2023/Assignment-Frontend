import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

function UserPage() {
  return (
    <div className="user-page">
      <h1>Welcome to the Coupon Distribution System</h1>
      <p>Claim your exclusive coupon now!</p>
      <div className="user-actions">
        <Link to="/claim">
          <button className="claim-button">Claim Coupon</button>
        </Link>
        <Link to="/">
          <button className="home-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
