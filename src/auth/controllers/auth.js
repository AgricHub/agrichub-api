const User = require('./path/to/UserModel'); // Update the path to your UserModel file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { HttpError } = require('@utils/errors');

async function registerUser(req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HttpError('Email already exists', 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpError('Invalid email or password', 401);
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new HttpError('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function fetchUser(req, res) {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;

  try {
    // Find the user by ID and update
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new HttpError('User not found', 404);
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle errors
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

module.exports = { registerUser, loginUser, fetchUser, updateUser, deleteUser };
