import axios from 'axios';

// Ensure the URL always ends with /api
const getBaseUrl = () => {
  const url = process.env.REACT_APP_API_URL || 'https://luusafety-backend.onrender.com';
  // Remove any trailing slash and add /api
  return `${url.replace(/\/$/, '')}/api`;
};

const API = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default API;