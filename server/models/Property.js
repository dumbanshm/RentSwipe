const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'condo', 'studio', 'other'],
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  squareFootage: Number,
  furnished: {
    type: Boolean,
    default: false
  },
  petFriendly: {
    type: Boolean,
    default: false
  },
  leaseLength: {
    type: Number, // in months
    required: true
  }
});

// Add text index for search functionality
propertySchema.index({ 
  title: 'text', 
  description: 'text', 
  'location.city': 'text', 
  'location.state': 'text' 
});

module.exports = mongoose.model('Property', propertySchema); 