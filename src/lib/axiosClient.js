import axios from 'axios';

const API_URL = 'http://localhost:3000'; // сюда укажи свой реальный backend адрес

export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Автоматическое добавление токена из localStorage
axiosClient.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
