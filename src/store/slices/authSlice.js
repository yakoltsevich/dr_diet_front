import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setCredentials(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const {
    setIsAuthenticated,
    setUser,
    setCredentials,
    logout
} = authSlice.actions;

export default authSlice.reducer;
