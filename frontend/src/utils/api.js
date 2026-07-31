import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.VITE_API_URL || 'https://your-backend-service-name.onrender.com/api',
  withCredentials: true,
});

export default API;