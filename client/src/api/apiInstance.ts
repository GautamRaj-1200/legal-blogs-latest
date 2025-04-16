import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:7500/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
