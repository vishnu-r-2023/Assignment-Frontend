import React, { useEffect, useState } from 'react';
import { getCoupons, addCoupon, toggleCoupon, deleteCoupon, updateCoupon, getClaimHistory } from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState('');
  const [error, setError] = useState('');
  const [claimHistory, setClaimHistory] = useState([]);
  const [editCouponId, setEditCouponId] = useState(null);
  const [editCouponCode, setEditCouponCode] = useState('');
  const navigate = useNavigate();
  const couponsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getCoupons();
        setCoupons(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch coupons');
      }
    };

    const fetchClaimHistory = async () => {
      try {
        const response = await getClaimHistory(); // Use the API method to fetch claim history
        console.log('Claim history fetched:', response.data); // Debugging
        setClaimHistory(response.data);
      } catch (error) {
        console.error('Error fetching claim history:', error.response?.data || error.message); // Debugging
        setError('Failed to fetch claim history');
      }
    };

    fetchCoupons();
    fetchClaimHistory();
  }, []);

  const handleAddCoupon = async () => {
    try {
      if (!newCoupon.trim()) {
        setError('Coupon code cannot be empty');
        return;
      }

      console.log('Sending add coupon request:', newCoupon); // Debugging
      await addCoupon(newCoupon); // Call the API to add the coupon
      setNewCoupon('');
      const response = await getCoupons(); // Fetch updated coupons
      console.log('Updated coupons:', response.data); // Debugging
      setCoupons(response.data);
    } catch (error) {
      console.error('Error adding coupon:', error.response?.data || error.message); // Debugging
      setError(error.response?.data?.message || 'Failed to add coupon');
    }
  };

  const handleToggleCoupon = async (id) => {
    try {
      await toggleCoupon(id);
      const response = await getCoupons();
      setCoupons(response.data);
    } catch (error) {
      console.error('Error toggling coupon:', error.response?.data || error.message);
    }
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await deleteCoupon(id);
      const response = await getCoupons();
      setCoupons(response.data);
    } catch (error) {
      console.error('Error deleting coupon:', error.response?.data || error.message);
    }
  };

  const handleEditCoupon = (id, code) => {
    setEditCouponId(id);
    setEditCouponCode(code);
  };

  const handleUpdateCoupon = async () => {
    try {
      if (!editCouponCode.trim()) {
        setError('Coupon code cannot be empty');
        return;
      }

      console.log('Sending update request for coupon ID:', editCouponId); // Debugging
      console.log('New coupon code:', editCouponCode); // Debugging

      const response = await updateCoupon(editCouponId, editCouponCode); // Use the updateCoupon API method
      console.log('Update response:', response.data); // Debugging

      const updatedCoupons = await getCoupons();
      setCoupons(updatedCoupons.data);
      setEditCouponId(null);
      setEditCouponCode('');
    } catch (error) {
      console.error('Error updating coupon:', error.response?.data || error.message); // Debugging
      setError(error.response?.data?.message || 'Failed to update coupon');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="add-coupon">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={newCoupon}
          onChange={(e) => setNewCoupon(e.target.value)}
        />
        <button onClick={handleAddCoupon}>Add Coupon</button>
      </div>
      <ul className="coupon-list">
        {currentCoupons.map((coupon) => (
          <li key={coupon._id} className="coupon-item">
            {editCouponId === coupon._id ? (
              <div>
                <input
                  type="text"
                  value={editCouponCode}
                  onChange={(e) => setEditCouponCode(e.target.value)}
                />
                <button onClick={handleUpdateCoupon}>Update</button>
                <button onClick={() => setEditCouponId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{coupon.code} - {coupon.isActive ? 'Active' : 'Inactive'}</span>
                <div className="coupon-actions">
                  <button onClick={() => handleToggleCoupon(coupon._id)}>Toggle</button>
                  <button onClick={() => handleDeleteCoupon(coupon._id)} className="delete-button">Delete</button>
                  <button onClick={() => handleEditCoupon(coupon._id, coupon.code)}>Edit</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(Math.ceil(coupons.length / couponsPerPage)).keys()].map((number) => (
          <button key={number} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
      <h2>User Claim History</h2>
      <table className="claim-history-table">
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Claimed By (IP/Session)</th>
            <th>Claimed At</th>
          </tr>
        </thead>
        <tbody>
          {claimHistory.length > 0 ? (
            claimHistory.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.code}</td>
                <td>{entry.claimedBy || 'N/A'}</td>
                <td>{new Date(entry.claimedAt).toLocaleString() || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No claimed coupons found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default AdminDashboard;
