import LoginPage from './pages/LoginPage';
import AuthorsListPage from './pages/AuthorsListPage';
import BooksListPage from './pages/BooksListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LogoutPage from './pages/LogoutPage';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectIsAuthenticated } from './utils/userSlice';
import { RootState } from './utils/store'; 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';

export default function AppRouter() {
  const isAuthenticatedState = useSelector((state: RootState) => selectIsAuthenticated(state));
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // const { isAuthenticated, isLoading, user } = useAuth0();

  // useEffect(() => {
  //   if (!isLoading && isAuthenticated && user) {
  //     // Retrieve stored username
  //     const storedUsername = user.nickname || user.email || "Unknown";
  //     // Dispatch to Redux store
  //     dispatch(login({ username: storedUsername }));
  //   }else {
  //     dispatch(logout());
  //     if(window.location.pathname !== '/login'){
  //       window.location.href = '/login';
  //     }
  //   }
  // }, [isAuthenticated, user]);

  useEffect(() => {

    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");


    if(role && username){
      dispatch(login({ username, role }))
    }else{
      dispatch(logout());
    }

    setIsLoading(false);

  }, [])

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
        {!isAuthenticatedState ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path='*' element={<LoginPage />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path="/authors" element={<AuthorsListPage />} />
            <Route path="/books" element={<BooksListPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
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