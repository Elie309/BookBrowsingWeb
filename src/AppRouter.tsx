import LoginPage from './pages/LoginPage';
import AuthorsListPage from './pages/AuthorsListPage';
import BooksListPage from './pages/BooksListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected import statement
import LogoutPage from './pages/LogoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectIsAuthenticated } from './utils/userSlice';
import { RootState } from './utils/store'; // Assuming you have a RootState type defined in your store
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

export default function AppRouter() {
  const isAuthenticatedState = useSelector((state: RootState) => selectIsAuthenticated(state));
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Retrieve stored username
      const storedUsername = user.nickname || user.email || "Unknown";
      // Dispatch to Redux store
      dispatch(login({ username: storedUsername }));
    }else {
      dispatch(logout());
      if(window.location.pathname !== '/login'){
        window.location.href = '/login';
      }
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && !isAuthenticatedState ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path='*' element={<LoginPage />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/authors" element={<AuthorsListPage />} />
            <Route path="/books" element={<BooksListPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            <Route path="/author/:id" element={<AuthorDetailsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        )}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}