import { useEffect, useState } from 'react';
import { TextField, Button, IconButton, Typography, InputAdornment, Box } from '@mui/material';
import { Visibility, VisibilityOff, Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { toggleTheme } from '../utils/themeSlice';
import Loading from '../components/Loading';
import { login } from '../utils/userSlice';
import Logo from '../components/Logo';



const users = [
  {
    username: "grappasystems3@gmail.com",
    password: "GSRecruit2025",
    role: "all"
  },
  {
    username: "grappasystems4@gmail.com",
    password: "GSRecruit2025",
    role: "authors"
  },
  {
    username: "grappasystems5@gmail.com",
    password: "GSRecruit2025",
    role: "books"
  },

]


export default function LoginPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if (isAuthenticated) {
      navigate('/')
    } else {
      if (window.location.pathname !== '/login') {
        navigate('/login')
      }
    }
    console.log(theme.palette.primary.main)
    setLoading(false)

  }, [navigate]);

  // const handleOAuthLogin = async () => {
  // if (username.length < 4 || password.length < 8) {
  //   setError("Password must be at least 8 characters long, and username must be at least 4 characters long");
  //   return;
  // }

  // sessionStorage.setItem(AuthService.TEMP_USERNAME_KEY, username);

  // try {
  //   await AuthService.login(username, password);
  // } catch (err) {
  //   setError("Failed to authenticate with OAuth.");
  // }
  // };

  const handleDumpLogin = () => {

    if(username.length < 4) {
      setError("Username must be at least 4 characters long");
      return;
    }

    if(password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    const userList = users.find((user) => user.username === username && user.password === password);

    if (!userList) {
      setError("Invalid username or password");
      return;
    }
    let user = {
      username: userList.username,
      role: userList.role
    }

    dispatch(login(user))

    navigate("/")


  }

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
        <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Logo fill={"none"} stroke={`${theme.palette.primary.main}`} width='150' height='150' className='' />
          <Typography variant="h4" style={{ marginBottom: theme.spacing(2) }}>
            Login
          </Typography>
          <Typography variant="h6" textAlign={"center"} style={{ marginBottom: theme.spacing(2) }}>
            Your favorite Books & Authors Library
          </Typography>

        </Box>

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

          {error &&
            <Box marginY={theme.spacing(2)} >
              <Typography color="error" noWrap textAlign={"center"}>{error}</Typography>
            </Box>}


          <Box marginY={theme.spacing(2)} flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Button variant="contained" color="primary"
                 style={{width: "50%"}} onClick={handleDumpLogin}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
