import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { Favorite as FavoriteIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import PropertyCard from './PropertyCard';
import { getPropertiesForSwiping, likeProperty, dislikeProperty } from '../services/api';

const SwipeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(2),
  position: 'relative',
}));

const CardContainer = styled(Box)({
  width: '100%',
  maxWidth: 600,
  height: 500,
  position: 'relative',
});

const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(2),
}));

const SwipeView: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await getPropertiesForSwiping();
      setProperties(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading properties:', error);
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: string, propertyId: string) => {
    try {
      if (direction === 'right') {
        await likeProperty(propertyId);
      } else if (direction === 'left') {
        await dislikeProperty(propertyId);
      }
    } catch (error) {
      console.error('Error handling swipe:', error);
    }
  };

  const handleButtonClick = (direction: 'left' | 'right') => {
    if (properties.length > 0) {
      const propertyId = properties[properties.length - 1]._id;
      handleSwipe(direction, propertyId);
      setProperties(prev => prev.slice(0, -1));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SwipeContainer>
      <CardContainer>
        {properties.map((property, index) => (
          <Box
            key={property._id}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: index === properties.length - 1 ? 'block' : 'none',
            }}
          >
            <TinderCard
              onSwipe={(dir) => {
                handleSwipe(dir, property._id);
                setProperties(prev => prev.filter(p => p._id !== property._id));
              }}
              preventSwipe={['up', 'down']}
            >
              <PropertyCard property={property} />
            </TinderCard>
          </Box>
        ))}
      </CardContainer>

      <ButtonsContainer>
        <IconButton
          onClick={() => handleButtonClick('left')}
          sx={{
            backgroundColor: 'error.light',
            color: 'white',
            '&:hover': { backgroundColor: 'error.main' },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={() => handleButtonClick('right')}
          sx={{
            backgroundColor: 'success.light',
            color: 'white',
            '&:hover': { backgroundColor: 'success.main' },
          }}
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </ButtonsContainer>

      {properties.length === 0 && (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          No more properties to show! Check back later for new listings.
        </Typography>
      )}
    </SwipeContainer>
  );
};

export default SwipeView; 