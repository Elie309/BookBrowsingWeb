import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { RootState } from './utils/store';
import AppRouter from './AppRouter';

function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#fff',
      },
      secondary: {
        light: '#fbdaaf',
        main: '#F4A236',
        dark: '#EA8B0D',
        contrastText: '#000',
      }
    }
  });

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
  );
}

export default App;
