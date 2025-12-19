import axios from 'axios';

// Use environment variable or default to 3000
// If backend is running on a different port, update this or set VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: async (data: { name: string; email: string; password: string; role: string; department?: string; position?: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Attendance APIs
export const attendanceAPI = {
  checkIn: async () => {
    const response = await api.post('/attendance/check-in');
    return response.data;
  },
  checkOut: async () => {
    const response = await api.post('/attendance/check-out');
    return response.data;
  },
  myStatus: async () => {
    const response = await api.get('/attendance/my-status');
    return response.data;
  },
  liveAttendance: async () => {
    const response = await api.get('/attendance/live');
    return response.data;
  },
  summary: async () => {
    const response = await api.get('/attendance/summary');
    return response.data;
  },
};

// Wi-Fi API
export const wifiAPI = {
  checkWifi: async () => {
    const response = await api.get('/attendance/check-wifi');
    return response.data;
  },
};

export default api;

