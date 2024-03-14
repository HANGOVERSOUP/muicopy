import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

import getSignInSideTheme from './getSignInSideTheme';
import ToggleColorMode from './ToggleColorMode';

import ForgotPassword from './ForgotPassword';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const whiteLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf7356420e154daf_SitemarkLight.svg';
const darkLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73563dba154dad_SitemarkDark.svg';

const logoStyle = {
  width: '140px',
  height: '56px',
  opacity: 0.8,
};

export default function SignInSide() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInSideTheme = createTheme(getSignInSideTheme(mode));
  const logo = showCustomTheme
    ? SignInSideTheme.palette.mode === 'light'
      ? darkLogo
      : whiteLogo
    : defaultTheme.palette.mode === 'light'
      ? darkLogo
      : whiteLogo;
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = React.useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <ThemeProvider theme={showCustomTheme ? SignInSideTheme : defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? 'rgba(251,252,254,0.6)'
              : 'rgba(9,14,16,0.8)',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundSize: 'cover',
            filter: 'blur(80px)',
            zIndex: -1,
          },
        }}
      >
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                mt: 4,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  ml: '-18px',
                  alignItems: 'center',
                }}
              >
                <img src={logo} style={logoStyle} alt="logo of sitemark" />
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              </Box>
              <Typography component="h1" variant="h3">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 1,
                  maxWidth: 400,
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  color={emailError ? 'error' : 'primary'}
                />
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  color={passwordError ? 'error' : 'primary'}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Link component="button" onClick={handleClickOpen} variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={validateInputs}
                >
                  Sign In
                </Button>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Box>
              <ForgotPassword open={open} handleClose={handleClose} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
