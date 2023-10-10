import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RegisterState from '../types/states/ReisterStae';

const initialState: RegisterState = {
  isEmailValid: false,
  isPasswordValid: false,
  isFnameValid: false,
  isLnameValid: false,
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
    setFnameError:(state, action: PayloadAction<boolean>) => {
      state.isFnameValid = action.payload;
    },
    setLnameError:(state, action: PayloadAction<boolean>) => {
      state.isLnameValid = action.payload;
    },
  },
});

export const { setEmailError, setPasswordError, setFnameError, setLnameError } = registerSlice.actions;

export default registerSlice.reducer;