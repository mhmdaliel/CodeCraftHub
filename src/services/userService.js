// src/services/userService.js
const User = require('../models/userModel');

// Function to find user by email
exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};