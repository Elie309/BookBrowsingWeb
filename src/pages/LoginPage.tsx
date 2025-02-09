import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Typography, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
// import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { toggleTheme } from '../utils/themeSlice';
import AuthService from '../Services/AuthService';
import Loading from '../components/Loading';


export default function LoginPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.log(window.location.pathname);
      if (window.location.pathname !== "login") {
        navigate("/login");
      }
      setLoading(false);
      return;
    }


    AuthService.exchangeCodeForToken(code)
      .then((accessToken) => {
        console.log(accessToken);
        navigate("/books")
      })
      .catch((error) => console.error("Error exchanging code:", error));

  }, [navigate]);

  const handleOAuthLogin = async () => {
    if (username.length < 4 || password.length < 8) {
      setError("Password must be at least 8 characters long, and username must be at least 4 characters long");
      return;
    }

    sessionStorage.setItem(AuthService.TEMP_USERNAME_KEY, username);

    try {
      await AuthService.login(username, password);
    } catch (err) {
      setError("Failed to authenticate with OAuth.");
    }
  };

  if (loading) {
    return <Loading />
  }

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
        <form action="">
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
        </form>
      </Box>
    </Box>
  );
}
