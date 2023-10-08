import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RegisterState from '../types/states/ReisterStae';

const initialState: RegisterState = {
  isEmailValid: false,
  isPasswordValid: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmailError: (state, action: PayloadAction<boolean>) => {
      state.isEmailValid = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<boolean>) => {
      state.isPasswordValid = action.payload;
    },
  },
});

export const { setEmailError, setPasswordError } = registerSlice.actions;

export default registerSlice.reducer;