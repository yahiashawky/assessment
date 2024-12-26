import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userId: null,
        userName: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
        },
        clearCredentials: (state) => {
            state.token = null;
            state.userId = null;
            state.userName = null;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;