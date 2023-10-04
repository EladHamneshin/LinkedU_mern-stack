import { createSlice } from '@reduxjs/toolkit';
import AuthState from '../types/AuthState.js';

const initialState: AuthState = {
   userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    removeCerdentials: (state, _) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, removeCerdentials } = authSlice.actions;

export default authSlice.reducer;