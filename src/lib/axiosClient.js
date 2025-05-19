import axios from 'axios';
import {store} from '@/store'; // путь до твоего redux store
import {setAccessToken} from '@/store/slices/authSlice';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? process.env.NEXT_PUBLIC_API_URL_LOCAL : process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, // чтобы отправлялись cookies (refresh_token)
    headers: {
        'Content-Type': 'application/json',
    },
});

// Добавляем access token из Redux
axiosClient.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Ответы: перехватываем 401 и пробуем обновить токен
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login')
        ) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(`${API_URL}/auth/refresh`, {}, {withCredentials: true});

                const newAccessToken = res.data.access_token;
                store.dispatch(setAccessToken(newAccessToken));

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                store.dispatch(setAccessToken(null));
                // if (typeof window !== 'undefined') {
                //     window.location.href = '/login';
                // }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
