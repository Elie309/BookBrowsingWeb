import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, MenuItem, Select, CircularProgress, Box } from '@mui/material';
import BookListingItem from '../components/BookListingItem';
import { Book, BookService } from '@elie309/bookbrowsinglibrary';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useNavigate } from 'react-router-dom';

enum Sort {
  TITLE = 'title',
  publish_year = 'new',
}

export default function BooksListPage() {

  const [books, setBooks] = useState<Book[]>(JSON.parse(localStorage.getItem('books') || '[]'));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [textNotFound, setTextNotFound] = useState('Search for books!');
  const [query, setQuery] = useState('');

  const {role} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [sort, setSort] = useState<Sort>(Sort.TITLE);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchBooks = async () => {
    setLoading(true);
    let fetchedBooks = await BookService.fetchBooks(query, page, 10, sort);
    setBooks(prevBooks => [...prevBooks, ...fetchedBooks]);
    setLoading(false);
    setTextNotFound('No books found!');
  };

  useEffect(() => {

    if(role === "authors"){
      navigate("/authors")
    }

    const savedQuery = localStorage.getItem('query');
    const savedSort = localStorage.getItem('sort');

    if (savedQuery) setQuery(savedQuery);
    if (savedSort) setSort(savedSort as Sort);
  }, []);

  useEffect(() => {
    if (query.length < 3) return;

    fetchBooks();
  }, [query, page, sort]);

  useEffect(() => {
    setBooks([]);
    setPage(1);
  }, [query, sort]);

  useEffect(() => {
    localStorage.setItem('query', query);
    localStorage.setItem('sort', sort);
  }, [query, sort, page, books]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && !loading) {
      setPage(prevPage => prevPage + 1);
    }
    localStorage.setItem('scrollPosition', e.currentTarget.scrollTop.toString());
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll}  sx={{ height: '90vh', overflow: 'auto', paddingTop: 4, marginTop: 4, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: "row" }, gap: 2 }}>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          sx={{ marginBottom: 2, flex: 0, minWidth: {xs: "full", md: 200 } }}
        >
          <MenuItem value={Sort.TITLE}>Title</MenuItem>
          <MenuItem value={Sort.publish_year}>Publish Year</MenuItem>
        </Select>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ marginBottom: 2, flex: 1, width: "full" }}
        />

      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={1} alignItems={'center'}>

        {books.length === 0 && !loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}>{textNotFound}</Box>}

        {books.map(book => (
          <BookListingItem
            key={book.id + book.title + Math.random()}
            {...book}
          />
        ))}
      </Box>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
    </Container>
  );
};

