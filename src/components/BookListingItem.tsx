import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Book } from '@elie309/bookbrowsinglibrary';


export default function BookListingItem(book: Book) {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    
    return (
        <Card 
        elevation={3}
            onClick={() => navigate(`/books/${book.id}`)} 
            sx={{ 
                cursor: 'pointer', 
                marginBottom: 2, 
                display: 'flex', 
                flexDirection: 'row', 
                width: { xs: '100%', sm: '75%', md: '60%' } 
            }}
        >


            {!imageLoaded && (
                <Skeleton variant="rectangular" width={150} height={250} />
            )}
            {book.cover && (
                <CardMedia
                    component="img"
                    sx={{ width: 150, height: 250 }}
                    image={book.cover}
                    alt={book.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
            )}
            <CardContent sx={{ flex: 1 }} >
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2"
                 width={"100%"} 
                 textOverflow={"ellipsis"} 
                 sx={{ 
                   marginTop: 1, 
                   overflow: 'hidden', 
                   display: '-webkit-box', 
                   WebkitLineClamp: 2, 
                   WebkitBoxOrient: 'vertical' 
                 }}
                  color="textSecondary">
                    {book.authors.join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {book.publishYear}
                </Typography>
                {/* Description */}
                <Typography variant="body2" 
                 width={"100%"} 
                 textOverflow={"ellipsis"} 
                 sx={{ 
                   marginTop: 1, 
                   overflow: 'hidden', 
                   display: '-webkit-box', 
                   WebkitLineClamp: 2, 
                   WebkitBoxOrient: 'vertical' 
                 }}
                color="textSecondary">
                    {book.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

