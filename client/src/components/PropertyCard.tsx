import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PropertyCardProps {
  property: {
    images: string[];
    title: string;
    price: number;
    location: {
      city: string;
      state: string;
    };
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
  };
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  height: 500,
  borderRadius: 20,
  position: 'relative',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const CardOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  padding: theme.spacing(2),
  color: '#fff',
}));

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="100%"
        image={property.images[0]}
        alt={property.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardOverlay>
        <Typography variant="h5" gutterBottom>
          {property.title}
        </Typography>
        <Typography variant="h6" color="primary.light">
          ${property.price.toLocaleString()}/month
        </Typography>
        <Box display="flex" gap={1} mb={1}>
          <Typography variant="body1">
            {property.location.city}, {property.location.state}
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Chip
            label={`${property.bedrooms} ${property.bedrooms === 1 ? 'bed' : 'beds'}`}
            size="small"
            color="primary"
          />
          <Chip
            label={`${property.bathrooms} ${property.bathrooms === 1 ? 'bath' : 'baths'}`}
            size="small"
            color="primary"
          />
          <Chip
            label={`${property.squareFootage.toLocaleString()} sq ft`}
            size="small"
            color="primary"
          />
        </Box>
      </CardOverlay>
    </StyledCard>
  );
};

export default PropertyCard; 