const express = require('express');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for updating user profile
router.put('/users/:username', updateUserProfile);

module.exports = router;