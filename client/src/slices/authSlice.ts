import { createSlice } from '@reduxjs/toolkit';
import AuthState from '../types/states/AuthState.js';

const initialState: AuthState = {
   userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
    mode: 'light',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    removeCerdentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    }
  },
});

export const { setCredentials, removeCerdentials, setMode } = authSlice.actions;

export default authSlice.reducer;