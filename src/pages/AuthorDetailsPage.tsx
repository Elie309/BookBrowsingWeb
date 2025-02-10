import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Loading from '../components/Loading';
import { Author, AuthorServices } from '@elie309/bookbrowsinglibrary';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../utils/store';


export default function AuthorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(false);

  
  const {role} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const fetchAuthorDetails = async () => {
    try {
      setLoading(true);
      if (id) {
        const author = await AuthorServices.fetchAuthorDetail(id);
        if (author) setAuthor(author);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    if(role === "books"){
      navigate("/books")
      return;
    }

    fetchAuthorDetails();
  }, [id]);

  if (!author && loading) {
    return <Loading />
  }

  if (!author && !loading) {
    return <Typography variant="h4">Author not found</Typography>
  }

  if (!author) {
    return null;
  }

  return (
    <Container sx={{ height: '100vh' }}>
      <Box sx={{ padding: 4, height: "90%", overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>{author.name}</Typography>
        <Typography variant="subtitle1" gutterBottom>Born: {author.birthDate}</Typography>
        <Typography variant="subtitle1" gutterBottom>Died: {author.deathDate}</Typography>
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" flexDirection="row">
          <Box width={150} height={250} mr={2}>
            {author.photosUrl.length > 0 ? (
              <img src={author.photosUrl[0]} width={150} height={250} alt={author.name} />
            ) : (
              <Skeleton variant="rectangular" width={150} height={250} />
            )}
          </Box>

          <Box marginBottom={2} display="flex" flexDirection="column" justifyContent="flex-start">
            <Typography variant="h6">Biography</Typography>
            <Typography variant="body2" textAlign={"justify"}>{author.bio}</Typography>
          </Box>


        </Box>

        <Typography variant="h6" marginBottom={2}>
          <strong>Books:</strong> {author.topWork ? author.topWork : 'No books found'}
        </Typography>


        <Box marginBottom={2}>
          <Typography variant="h6">Alternate Names:</Typography>
          <Typography variant="body2">{author.alternateNames.length > 0 ? author.alternateNames.join(', ') : "No alternate"}</Typography>
        </Box>



      </Box>
    </Container>
  );
};
