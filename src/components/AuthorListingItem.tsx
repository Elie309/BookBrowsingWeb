import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Author } from '@elie309/bookbrowsinglibrary';

export default function AuthorListingItem(author: Author) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [validImage, setValidImage] = useState(true);

  useEffect(() => {
    return () => {
      setImageLoaded(false);
      setValidImage(true);
    };
  }, [author]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
      setValidImage(false);
    } else {
      setImageLoaded(true);
    }
  };

  return (
    <Card 
      elevation={3}
      onClick={() => navigate(`/authors/${author.id}`)} 
      sx={{ 
        cursor: 'pointer', 
        marginBottom: 2, 
        display: 'flex', 
        flexDirection: 'row', 
        width: { xs: '100%', sm: '75%', md: '50%', lg: '33%', xl: '25%' } 
      }}
    >
      {((author.photosUrl?.length || [].length) > 0) && validImage && (
        <CardMedia
          component="img"
          sx={{ width: 150, height: 250 }}
          image={author.photosUrl[0] || ''}
          alt={author.name}
          onLoad={handleImageLoad}
          onError={() => setValidImage(false)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {!imageLoaded && (
        <Skeleton variant="rectangular" width={150} height={250} />
      )}
      <CardContent sx={{ flex: 1 }} >
        <Typography variant="h6">{author.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {author.birthDate} {author.deathDate ? (" - " + author.deathDate) : ""}
        </Typography>
        <Typography 
          variant="body1" 
          width={"100%"} 
          textOverflow={"ellipsis"} 
          sx={{ 
            marginTop: 1, 
            overflow: 'hidden', 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' 
          }}
        >
          {author.alternateNames?.join(', ')}
        </Typography>

      </CardContent>
    </Card>
  );
};
