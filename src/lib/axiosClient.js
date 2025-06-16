import axios from 'axios';
import { store } from '@/store';
import { setAccessToken } from '@/store/slices/authSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  res => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await axiosClient.post('/auth/refresh', {}, { withCredentials: true });
        const newToken = res.data.access_token;
        store.dispatch(setAccessToken(newToken));
        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(original);
      } catch (e) {
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
