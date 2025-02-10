import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container, Typography, Link } from '@mui/material';
import Loading from '../components/Loading';
import { Book, BookService } from '@elie309/bookbrowsinglibrary';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {role} = useSelector((state: RootState) => state.user);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);

      if (id) {
        const book = await BookService.fetchBookDetails(id);
        setBook(book);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

  }


  useEffect(() => {

    if(role === "authors"){
      navigate("/authors")
    }

    fetchBookDetails();
  }, [id]);

  if (!book && loading) {
    return <Loading />
  }

  if (!book && !loading) {
    return <Typography variant="h4">Book not found</Typography>
  }

  if (!book) {
    return null;
  }

  return (
    <Container sx={{ height: '100vh' }}>
      <Box sx={{ padding: 4, height: "90%", overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>{book.title}</Typography>


        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="row">
          <Box width={150} height={250} mr={2}>
            {book.cover ? (
              <img src={book.cover} width={150} height={250} alt={book.title} />
            ) : (
              <Skeleton variant="rectangular" width={150} height={250} />
            )}
          </Box >


          <Box flex={1} display="flex" flexDirection="column" justifyContent="flex-start">

            <Typography variant="body1" textAlign={"justify"}>{book.description}</Typography>
          </Box>
        </Box>


        <Typography variant='h6' gutterBottom>Authors:</Typography>
        <Typography variant="body1" marginBottom={2}>

          {book.authors.map((author, index) => (
            <Typography variant='body2' key={index}>
              <Link component={"a"} sx={{cursor: "pointer"}} onClick={() => {
                navigate(`/authors/${book.authorsKey[index]}`)
              }
              }>
                {author}
              </Link>
            </Typography>
          ))}
        </Typography>

        <Typography variant="body2" marginBottom={2} color="textSecondary">
          <strong>Published Year:</strong> {book.publishYear || 'Unknown'}
        </Typography>
        <Typography variant="body2" marginBottom={2} color="textSecondary">
          <strong>Edition Count:</strong> {book.editionCount || 'Unknown'}
        </Typography>


        <Typography variant="body2" marginBottom={2} color="textSecondary" textAlign={"justify"}>
          <strong>Subjects People:</strong> {book.subject_people?.length ? book.subject_people.join(', ') : 'Unknown'}
        </Typography>

        <Typography variant="body2" marginBottom={2} color="textSecondary" textAlign={"justify"}>
          <strong>Places:</strong> {book.subject_places?.length ? book.subject_places.join(', ') : 'Unknown'}
        </Typography>


        <Typography variant="body2" marginBottom={2} color="textSecondary" textAlign={"justify"}>
          <strong>Subject Times:</strong> {book.subject_times?.length ? book.subject_times.join(', ') : 'Unknown'}
        </Typography>

        <Typography variant="body2" color="textSecondary" textAlign={"justify"}>
          <strong>Subjects: </strong> {book.subjects?.length ? book.subjects.join(', ') : 'Unknown'}
        </Typography>
      </Box>
    </Container >
  );
};

