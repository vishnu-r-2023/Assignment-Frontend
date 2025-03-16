import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserClaimHistory.css';

function UserClaimHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coupons/history'); // Correct endpoint
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching claim history:', error.response?.data || error.message);
        setError('Failed to fetch claim history');
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="user-claim-history">
      <h1>User Claim History</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Claimed By (IP/Session)</th>
            <th>Claimed At</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.code}</td>
              <td>{entry.claimedBy || 'N/A'}</td>
              <td>{new Date(entry.claimedAt).toLocaleString() || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserClaimHistory;
