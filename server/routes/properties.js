const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Property CRUD operations
router.post('/', propertyController.createProperty);
router.get('/swipe', propertyController.getPropertiesForSwiping);
router.get('/liked', propertyController.getLikedProperties);
router.get('/:propertyId', propertyController.getPropertyDetails);
router.put('/:propertyId', propertyController.updateProperty);
router.delete('/:propertyId', propertyController.deleteProperty);

// Swipe actions
router.post('/:propertyId/like', propertyController.likeProperty);
router.post('/:propertyId/dislike', propertyController.dislikeProperty);

module.exports = router; 