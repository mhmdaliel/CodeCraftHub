// src/controllers/userController.js
const User = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Here you would normally check the password (this is just a placeholder)
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
      const { username } = req.params; // Get username from URL parameters
      const updates = req.body; // Get the update data from the request body

      // Find the user by username and update their details
      const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating user profile', error });
  }
};