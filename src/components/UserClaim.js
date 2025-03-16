import React, { useState } from 'react';
import { claimCoupon } from '../api';
import './UserClaim.css';

function UserClaim() {
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    try {
      const sessionClaimed = document.cookie.includes('sessionClaimed=true');
      if (sessionClaimed) {
        setMessage('You have already claimed a coupon in this session.');
        return;
      }

      console.log('Sending claim request...'); // Debugging
      const response = await claimCoupon();
      console.log('Claim response:', response.data); // Debugging
      setMessage(`Success! Your coupon code is: ${response.data.coupon}`);
    } catch (error) {
      console.error('Error during claim:', error.response?.data || error.message); // Debugging
      if (error.response?.status === 404) {
        setMessage('No coupons available at the moment. Please try again later.');
      } else {
        setMessage(error.response?.data?.message || 'Error claiming coupon');
      }
    }
  };

  return (
    <div className="user-claim">
      <h1>Welcome, Guest User!</h1>
      <p>Click the button below to claim your coupon.</p>
      <button onClick={handleClaim}>Claim Coupon</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UserClaim;
