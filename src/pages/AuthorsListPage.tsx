import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, MenuItem, Select, CircularProgress, Box } from '@mui/material';
import AuthorListingItem from '../components/AuthorListingItem';
import { Author, AuthorServices } from '@elie309/bookbrowsinglibrary';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../utils/store';

enum Sort {
  NAME = 'name',
  BIRTH_DATE = 'birth_date',
}

export default function AuthorsListPage() {
  const [authors, setAuthors] = useState<Author[]>(JSON.parse(localStorage.getItem('authors') || '[]'));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [textNotFound, setTextNotFound] = useState('Search for authors!');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>(Sort.NAME);
  const containerRef = useRef<HTMLDivElement>(null);

  const {role} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    setLoading(true);
    let fetchedAuthors = await AuthorServices.fetchAuthors(query, page, 10, sort);
    setAuthors(prevAuthors => [...prevAuthors, ...fetchedAuthors]);
    setLoading(false);
    setTextNotFound('No authors found!');
  };

  useEffect(() => {

    if(role === "books"){
      navigate("/books")
    }

    const savedQuery = localStorage.getItem('authorQuery');
    const savedSort = localStorage.getItem('authorSort');
    if (savedQuery) setQuery(savedQuery);
    if (savedSort) setSort(savedSort as Sort);
  }, []);

  useEffect(() => {
    if (query.length < 3) return;
    fetchAuthors();
  }, [query, page, sort]);

  useEffect(() => {
    setAuthors([]);
    setPage(1);
  }, [query, sort]);

  useEffect(() => {
    localStorage.setItem('authorQuery', query);
    localStorage.setItem('authorSort', sort);
  }, [query, sort, page, authors]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom && !loading) {
      setPage(prevPage => prevPage + 1);
    }
    localStorage.setItem('authorScrollPosition', e.currentTarget.scrollTop.toString());
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll} sx={{ height: '90vh', overflow: 'auto', paddingTop: 4, marginTop: 4, width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: "row" }, gap: 2 }}>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          sx={{ marginBottom: 2, flex: 0, minWidth: {xs: "full", md: 200 } }}
        >
          <MenuItem value={Sort.NAME}>Name</MenuItem>
          <MenuItem value={Sort.BIRTH_DATE}>Birth Date</MenuItem>
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
        {authors.length === 0 && !loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}>{textNotFound}</Box>}
        {authors.map(author => (
          <AuthorListingItem
            key={author.id + author.name + Math.random()}
            {...author}
          />
        ))}
      </Box>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
    </Container>
  );
};
