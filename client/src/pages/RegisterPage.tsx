import React, {FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { useRegisterMutation } from '../api/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import LogoBar from '../components/LogoBar';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { handleResError, handleValidationError } from '../utils/errorHandler';
import 'react-toastify/dist/ReactToastify.css'
import { setEmailError, setPasswordError, setFnameError, setLnameError } from '../slices/registerSlice';
import RegisterState from '../types/states/ReisterStae';
import { isValidEmail, isValidPassword } from '../utils/validators';
import ROUTES from '../routes/routesModel';


export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const {isEmailValid, isPasswordValid, isFnameValid, isLnameValid} = useSelector<any, RegisterState>((state) => state.register);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(!isEmailValid){
      handleValidationError("Email must be a valid email")
      return
    }
      
    if(!isPasswordValid){
      handleValidationError("Password must be a valid password")
      return
    }

    if(!isFnameValid){
      handleValidationError("First name must be valid")
      return
    }

    if(!isLnameValid){
      handleValidationError("Last name must be valid")
      return
    }

    const data = new FormData(event.currentTarget);
    const name = data.get('firstName') + ' ' + data.get('lastName');
    const email = data.get('email');
    const password = data.get('password');

    try {
      await register({ name, email, password }).unwrap();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      handleResError(err as FetchBaseQueryError);
    }
  };

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isValidEmail(event.target.value)) {
      dispatch(setEmailError(true));
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidEmail(event.target.value)) {
      dispatch(setEmailError(false));
    }
  }

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isValidPassword(event.target.value)) {
      dispatch(setPasswordError(true));
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidPassword(event.target.value)) {
      dispatch(setPasswordError(false));
    }
  }

  const handleFnameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      dispatch(setFnameError(true));
    }
  }

  const handleFnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      dispatch(setFnameError(false));
    }
  }

  const handleLnameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      dispatch(setLnameError(true));
    }
  }

  const handleLnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      dispatch(setLnameError(false));
    }
  }



  return (
      <Container component="main" maxWidth="xs">
        <LogoBar/>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onBlur={handleFnameBlur}
                  onChange={handleFnameChange}
                  required
                  fullWidth
                  error={isFnameValid}
                  helperText={isFnameValid ? 'First name is required' : ''}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onBlur={handleLnameBlur}
                  onChange={handleLnameChange}
                  required
                  fullWidth
                  error={isLnameValid}
                  helperText={isLnameValid ? 'Last name is required' : ''}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  required
                  fullWidth
                  error={isEmailValid}
                  helperText={isEmailValid ? 'Email must be a valid email address' : ''}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onBlur={handlePasswordBlur}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  error={isPasswordValid}
                  helperText={isPasswordValid ? 'Password must be at least 7 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character' : ''}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Register
            </Button>

            {isLoading && <p>Loading...</p>}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href={ROUTES.LOGIN} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
