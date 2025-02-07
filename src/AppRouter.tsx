import LoginPage from './pages/LoginPage';
import AuthorsListPage from './pages/AuthorsListPage';
import BooksListPage from './pages/BooksListPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorDetailsPage from './pages/AuthorDetailsPage';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Corrected import statement

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/authors" element={<AuthorsListPage />} />
          <Route path="/books" element={<BooksListPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/author/:id" element={<AuthorDetailsPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}