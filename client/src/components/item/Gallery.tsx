import { Card, CardMedia, IconButton } from '@mui/material';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface GalleryProps {
  images: string[];
}

const Gallery = ({ images }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card sx={{ mb: 2, position: 'relative' }}>
        <CardMedia
          component="img"
          height="400"
          image="https://via.placeholder.com/400"
          alt="Нет изображения"
        />
      </Card>
    );
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardMedia
        component="img"
        height="400"
        image={images[activeIndex]}
        alt={`Изображение ${activeIndex + 1}`}
      />
      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.8)'} }}
          >
            <ArrowBackIos sx={{ ml: 1 }}/>
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', '&:hover': {backgroundColor: 'rgba(0,0,0,0.8)'} }}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}
    </Card>
  );
};

export default Gallery;
