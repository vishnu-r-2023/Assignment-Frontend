import axios from 'axios';

const API = axios.create({ baseURL: 'https://assignment-backend-jmug.onrender.com/api' }); // Updated baseURL

// Add the admin token to the Authorization header
API.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  console.log('Admin token from localStorage:', adminToken); // Debugging
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else {
    console.log('No admin token found in localStorage'); // Debugging
  }
  return config;
}, (error) => {
  console.error('Error in request interceptor:', error); // Debugging
  return Promise.reject(error);
});

export const claimCoupon = () => API.post('/coupons/claim');
export const registerAdmin = (data) => API.post('/admin/register', data);
export const loginAdmin = (data) => API.post('/admin/login', data);
export const getCoupons = () => API.get('/coupons'); // Fetch all coupons
export const addCoupon = (code) => API.post('/coupons', { code });
export const toggleCoupon = (id) => API.patch(`/coupons/${id}/toggle`);
export const deleteCoupon = (id) => API.delete(`/coupons/${id}`);
export const updateCoupon = (id, code) => API.patch(`/coupons/${id}`, { code });
export const getClaimHistory = () => API.get('/coupons/history'); // Fetch claim history
