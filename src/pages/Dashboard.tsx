import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { useTheme } from '@mui/material/styles';


export default function Dashboard() {
    const navigate = useNavigate();
    const { role } = useSelector((state: RootState) => state.user);
    const theme = useTheme();

    return (
        <Container>
            <Box display="flex" flexDirection="column" 
            alignItems="center" justifyContent="flex-start" minHeight="100vh"
            gap={theme.spacing(4)}
            >
                <Typography variant="h4" gutterBottom marginTop={theme.spacing(4)}
                    color='primary'
                >
                    Dashboard
                </Typography>
                <Typography variant="h6" gutterBottom
                    color='textDisabled'
                >
                    Let us look for your favorite...
                </Typography>
                {role === 'all' && (
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center"
                        gap={theme.spacing(2)}
                    >
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/books')}>
                            Books
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/authors')}>
                            Authors
                        </Button>
                    </Box>
                )}
                {role === 'books' && (
                    <>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/books')}>
                            Books
                        </Button>
                    </>
                )}
                {role === 'authors' && (
                    <>
                        <Button variant="outlined" color="secondary" onClick={() => navigate('/authors')}>
                            Authors
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

