import LoginPage from './pages/LoginPage';
import AuthorsListPage from './pages/AuthorsListPage';
import BooksListPage from './pages/BooksListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected import statement
import LogoutPage from './pages/LogoutPage';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './utils/userSlice';
import { RootState } from './utils/store'; // Assuming you have a RootState type defined in your store

export default function AppRouter() {
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/login" element={<LoginPage />} />
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