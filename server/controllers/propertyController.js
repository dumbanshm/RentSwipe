const Property = require('../models/Property');
const User = require('../models/User');

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user.userId
    });
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// Get properties for swiping (excluding already liked/disliked)
exports.getPropertiesForSwiping = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const { minPrice, maxPrice, bedrooms, propertyType, city } = req.query;

    // Build query
    const query = {
      _id: { 
        $nin: [...user.likedProperties, ...user.dislikedProperties] 
      },
      available: true
    };

    // Add filters if provided
    if (minPrice) query.price = { $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (bedrooms) query.bedrooms = Number(bedrooms);
    if (propertyType) query.propertyType = propertyType;
    if (city) query['location.city'] = city;

    const properties = await Property.find(query)
      .populate('owner', 'name email')
      .limit(10);

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Like a property
exports.likeProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedProperties: propertyId },
      $pull: { dislikedProperties: propertyId }
    });

    res.json({ message: 'Property liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking property', error: error.message });
  }
};

// Dislike a property
exports.dislikeProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { dislikedProperties: propertyId },
      $pull: { likedProperties: propertyId }
    });

    res.json({ message: 'Property disliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error disliking property', error: error.message });
  }
};

// Get liked properties
exports.getLikedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('likedProperties');
    res.json(user.likedProperties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching liked properties', error: error.message });
  }
};

// Get property details
exports.getPropertyDetails = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId)
      .populate('owner', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property details', error: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.propertyId, owner: req.user.userId },
      req.body,
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.propertyId,
      owner: req.user.userId
    });
    if (!property) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
}; 