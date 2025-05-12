// src/store/index.js — оставь как есть, без preloadedState
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
