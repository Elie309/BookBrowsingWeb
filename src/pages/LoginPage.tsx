import { useState, useEffect } from 'react';
import { TextField, Button, IconButton, Typography, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { toggleTheme } from '../utils/themeSlice';
import { login } from '../utils/userSlice';
import axios from 'axios';

export default function LoginPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    const storedState = localStorage.getItem('oauth_state'); // Retrieve the stored state

    if (code && state) {
      if (state !== storedState) {
        setError('Invalid state parameter.');
        return;
      }

      // Exchange the authorization code for tokens
      axios.post('https://dev-j0zlk7gogm1b2ben.us.auth0.com/oauth/token', {
        code,
        redirect_uri: 'http://localhost:3000',
        client_id: 'ffe47fxGRhuze07vSOfbagpinW4Hnz0w',
        grant_type: 'authorization_code'
      })
      .then(response => {
        console.log(response.data);
        const { access_token, refresh_token } = response.data;
        // Store tokens and proceed with login
        dispatch(login({ access_token, refresh_token }));
      })
      .catch(() => {
        setError('Failed to exchange authorization code for tokens.');
      });

    } else if (window.location.pathname !== '/login') {
      navigate('/login');
    }

    const appState = (window as any).appState;
    if (appState) {
      setUsername(appState.username || '');
      setPassword(appState.password || '');
    }
  }, [navigate]);

  const handleOAuthLogin = async () => {
    try {
      if (username.length < 4 || password.length < 8) {
        setError('password must be at least 8 characters long, and username must be at least 3 characters long');
        return;
      }
      await loginWithRedirect({
        appState: { username, password },
      });
      dispatch(login({ username }));
    } catch (err) {
      setError('Failed to authenticate with OAuth.');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
      minWidth={"300px"} width={"fit"} height="100vh"
    >
      <Box display="flex" flexDirection="column"
        alignItems="center" justifyContent="center"
        boxShadow={3} borderRadius={2}
        bgcolor={theme.palette.background.paper}
        gap={theme.spacing(2)}
        width={"fit"} height="auto"
        padding={theme.spacing(3)}
      >
        <IconButton onClick={() => dispatch(toggleTheme())} style={{ alignSelf: 'flex-end' }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>
          Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          style={{ minWidth: '300px' }}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          style={{ minWidth: '300px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && <Typography color="error" noWrap>{error}</Typography>}

        <Box display="flex" flexDirection={"column"} gap={theme.spacing(2)}>
          <Button variant="contained" color="primary" onClick={handleOAuthLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
