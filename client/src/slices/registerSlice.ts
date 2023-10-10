import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import RegisterState from '../types/states/ReisterStae';

const initialState: RegisterState = {
  isEmailError: false,
  isPasswordError: false,
  isFnameError: false,
  isLnameError: false,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmailError: (state, action: PayloadAction<boolean>) => {
      state.isEmailError = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<boolean>) => {
      state.isPasswordError = action.payload;
    },
    setFnameError:(state, action: PayloadAction<boolean>) => {
      state.isFnameError = action.payload;
    },
    setLnameError:(state, action: PayloadAction<boolean>) => {
      state.isLnameError = action.payload;
    },
  },
});

export const { setEmailError, setPasswordError, setFnameError, setLnameError } = registerSlice.actions;

export default registerSlice.reducer;