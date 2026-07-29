import axios from 'axios';

const API = axios.create({
  baseURL: 'https://luusafety-backend.onrender.com/api', // Adjust '/api' if your backend uses a different route prefix
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;