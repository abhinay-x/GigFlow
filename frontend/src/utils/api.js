import axios from 'axios';

/**
 * Shared Axios client.
 *
 * - `baseURL` comes from `VITE_API_URL` (recommended in production).
 *   Example: `https://<render-service>.onrender.com/api`
 * - `withCredentials: true` is required because auth uses HttpOnly cookies.
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
