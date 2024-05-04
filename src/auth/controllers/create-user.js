const User = require('../models/User'); // Update the path to your UserModel file
const { HttpError } = require('@utils/errors');

async function createUser(req, res) {
  const { email, password, firstName, lastName, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError('Email already exists', 400);
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token for the user
    const token = newUser.generateAuthToken();

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { createUser };


