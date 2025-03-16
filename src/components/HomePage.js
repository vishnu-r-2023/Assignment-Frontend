import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1 className="home-title">Welcome to the Coupon Distribution System</h1>
      <p className="home-description">Claim your exclusive coupons or manage them as an admin!</p>
      <div className="home-actions">
        <Link to="/claim">
          <button className="home-button claim-button">Claim Coupon</button>
        </Link>
        <Link to="/user">
          <button className="home-button user-button">User Panel</button>
        </Link>
        <Link to="/admin">
          <button className="home-button admin-button">Admin Login</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
